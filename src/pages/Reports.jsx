import React, { useState, useEffect } from 'react'
import api from '../utils/api'
import { PieChart, TrendingUp, DollarSign } from 'lucide-react'

export default function Reports() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({ totalRevenue: 0, monthlyData: [], typeData: {} })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const data = await api.get('bookings')
        setBookings(data)
        calculateStats(data)
        setLoading(false)
    }

    const calculateStats = (data) => {
        const monthlyData = {}
        const typeData = {}
        let totalRevenue = 0

        data.forEach(booking => {
            if (booking.status === 'CANCELLED') return

            const date = new Date(booking.arrival_date)
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            const amount = booking.rate_amount || 0

            // Monthly breakdown
            if (!monthlyData[monthKey]) monthlyData[monthKey] = { revenue: 0, bookings: 0 }
            monthlyData[monthKey].revenue += amount
            monthlyData[monthKey].bookings += 1

            // Type breakdown (Property)
            const place = booking.place || 'Unknown'
            if (!typeData[place]) typeData[place] = 0
            typeData[place] += amount

            totalRevenue += amount
        })

        // Sort months desc
        const sortedMonths = Object.keys(monthlyData).sort().reverse().map(key => ({
            month: key,
            revenue: monthlyData[key].revenue,
            count: monthlyData[key].bookings
        }))

        setStats({ totalRevenue, monthlyData: sortedMonths, typeData })
    }

    if (loading) return <div style={{ padding: '20px' }}>Loading Reports...</div>

    return (
        <div className="animation-fade-in">
            <h1 className="mb-8">Business Reports</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div className="card shadow" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Revenue</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>${stats.totalRevenue.toLocaleString()}</div>
                        </div>
                        <DollarSign size={40} style={{ opacity: 0.5 }} />
                    </div>
                </div>
                <div className="card shadow" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Active Bookings</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{bookings.filter(b => b.status !== 'CANCELLED').length}</div>
                        </div>
                        <TrendingUp size={40} style={{ opacity: 0.5 }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div className="card shadow">
                    <h3>Monthly Earnings</h3>
                    <div style={{ overflowX: 'auto', marginTop: '15px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                                    <th style={{ padding: '10px' }}>Month</th>
                                    <th style={{ padding: '10px' }}>Bookings</th>
                                    <th style={{ padding: '10px', textAlign: 'right' }}>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.monthlyData.map(d => (
                                    <tr key={d.month} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '10px' }}>{d.month}</td>
                                        <td style={{ padding: '10px' }}>{d.count}</td>
                                        <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', color: 'var(--success)' }}>${d.revenue.toLocaleString()}</td>
                                    </tr>
                                ))}
                                {stats.monthlyData.length === 0 && <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No data available</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card shadow">
                    <h3>Revenue by Property</h3>
                    <div style={{ marginTop: '20px' }}>
                        {Object.entries(stats.typeData).map(([name, amount]) => (
                            <div key={name} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                                    <span>{name}</span>
                                    <span style={{ fontWeight: 'bold' }}>${amount.toLocaleString()}</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${(amount / stats.totalRevenue) * 100}%`, background: 'var(--primary)', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        ))}
                        {Object.keys(stats.typeData).length === 0 && <div style={{ color: 'var(--text-light)', textAlign: 'center' }}>No property data</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
