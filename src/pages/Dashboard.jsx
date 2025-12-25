import React, { useState, useEffect } from 'react'
import { Calendar, Users, DollarSign, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../utils/api'

function StatBox({ label, value, icon: Icon }) {
    return (
        <div className="stat-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div className="stat-label">{label}</div>
                    <div className="stat-value">{value}</div>
                </div>
                <div style={{ color: 'var(--primary)', opacity: 0.8 }}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    )
}

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        todayArrivals: 0,
        revenue: 0,
        pending: 0
    })
    const [recent, setRecent] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [bookings, invoices] = await Promise.all([
                    api.get('bookings'),
                    api.get('invoices')
                ])
                const today = new Date().toISOString().split('T')[0]

                setStats({
                    totalBookings: bookings.length,
                    todayArrivals: bookings.filter(b => b.arrival_date === today).length,
                    revenue: invoices.reduce((s, i) => s + (i.paid ? i.amount : 0), 0),
                    pending: invoices.filter(i => !i.paid).length,
                    upcomingArrivals: bookings.filter(b => {
                        const arr = new Date(b.arrival_date);
                        const now = new Date(today);
                        const diffTime = arr - now;
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return diffDays >= 0 && diffDays <= 7;
                    }).sort((a, b) => new Date(a.arrival_date) - new Date(b.arrival_date))
                })
                setRecent(bookings.slice(0, 5))
            } catch (e) {
                console.error("Dashboard calculation error:", e)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div style={{ padding: '20px' }}>Loading Data...</div>

    return (
        <div className="animation-fade-in">
            <div className="title-row">
                <h1>Dashboard Overview</h1>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="stats-grid mb-8">
                <StatBox label="Total Bookings" value={stats.totalBookings} icon={Users} />
                <StatBox label="Today's Arrivals" value={stats.todayArrivals} icon={Calendar} />
                <StatBox label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={DollarSign} />
                <StatBox label="Pending Invoices" value={stats.pending} icon={Clock} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div className="card">
                    <div className="title-row">
                        <h3>Recent Bookings</h3>
                        <Link to="/bookings" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold' }}>View All Bookings</Link>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Guest</th>
                                    <th>Arrival</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent.map(b => (
                                    <tr key={b.id}>
                                        <td style={{ fontWeight: '600' }}>{b.first_name} {b.last_name}</td>
                                        <td>{b.arrival_date}</td>
                                        <td>
                                            <span className={`badge ${b.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'}`}>
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {recent.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>No records available.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <div className="card mb-6" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
                        <h3 className="mb-4" style={{ color: '#c2410c' }}>Upcoming Alerts (7 Days)</h3>
                        {stats.upcomingArrivals?.length > 0 ? (
                            <ul style={{ padding: '0 20px', listStyle: 'none' }}>
                                {stats.upcomingArrivals.map(b => (
                                    <li key={b.id} style={{ marginBottom: '10px', fontSize: '0.9rem' }}>
                                        <div style={{ fontWeight: 'bold' }}>{b.arrival_date}</div>
                                        <div>{b.first_name} {b.last_name} ({b.place})</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>No immediate arrivals.</div>
                        )}
                    </div>

                    <div className="card">
                        <h3 className="mb-4">Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Link to="/bookings" className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                                <Calendar size={18} /> New Reservation
                            </Link>
                            <Link to="/rates" className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                                <DollarSign size={18} /> Manage Rates
                            </Link>
                            <Link to="/invoices" className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                                <Clock size={18} /> Send Invoice
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
