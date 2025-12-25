import React, { useState, useEffect } from 'react'
import { History, Calendar, MapPin } from 'lucide-react'
import api from '../utils/api'

export default function BookingHistory() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true)
            const data = await api.get('bookings')
            setBookings(data)
            setLoading(false)
        }
        fetchHistory()
    }, [])

    if (loading && bookings.length === 0) return <div style={{ padding: '20px' }}>Loading History...</div>

    return (
        <div className="animation-fade-in">
            <div className="title-row">
                <h1>Audit Trail & Reservation History</h1>
            </div>

            <div className="card shadow-sm">
                <p className="text-muted mb-6" style={{ fontSize: '0.9rem' }}>A complete historical record of all guest stays and reservations processed by the Fasmala Travels engine.</p>
                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Guest Identity</th>
                                <th>Stay Schedule</th>
                                <th>Reservation Status</th>
                                <th>Billing (Total)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div style={{ fontWeight: 'bold' }}>{item.first_name} {item.last_name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{item.email}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                            <Calendar size={14} className="text-primary" /> {item.arrival_date}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', marginLeft: '22px', color: 'var(--text-light)' }}>Stay duration: {item.nights} nights</div>
                                    </td>
                                    <td>
                                        <span className={`badge ${item.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: '700', color: 'var(--dark)' }}>${item.rate_amount?.toLocaleString()}</td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '60px', color: 'var(--text-light)' }}>
                                        <History size={40} style={{ opacity: 0.2, marginBottom: '10px' }} /><br />
                                        No historical records found in the audit trail.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
