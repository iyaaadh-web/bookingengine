import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit3, Save, X, Eye, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function Bookings() {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [viewingBooking, setViewingBooking] = useState(null)

    const initialForm = {
        first_name: '', last_name: '', email: '', phone: '',
        place: 'Fasmala Resort', arrival_date: '', nights: 1,
        adults: 1, children: 0,
        room_type: 'STD', partner_name: '',
        rate_amount: 0, cost_amount: 0, status: 'CONFIRMED',
        supplier_invoice: ''
    }
    const [form, setForm] = useState(initialForm)
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        fetchData()
        fetchHotels()
    }, [])

    const fetchHotels = async () => {
        try { const data = await api.get('hotels'); setHotels(data) } catch (e) { }
    }

    const fetchData = async () => {
        setLoading(true)
        const data = await api.get('bookings')
        setBookings(data)
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editingId) {
            await api.put('bookings', editingId, form)
        } else {
            await api.post('bookings', form)
        }
        setShowForm(false)
        setEditingId(null)
        setForm(initialForm)
        fetchData()
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return
        await api.delete('bookings', id)
        fetchData()
    }

    const startEdit = (item) => {
        setEditingId(item.id)
        setForm(item)
        setShowForm(true)
        setViewingBooking(null)
    }

    const handleView = (item) => {
        setViewingBooking(item)
    }

    const goToInvoice = (bookingId) => {
        navigate('/invoices', { state: { bookingId } })
    }

    if (loading && bookings.length === 0) return <div style={{ padding: '20px' }}>Loading Bookings...</div>

    return (
        <div className="animation-fade-in">
            <div className="title-row">
                <h1>Manage Bookings</h1>
                <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(initialForm); setViewingBooking(null); }}>
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? 'Close Form' : 'New Reservation'}
                </button>
            </div>

            {/* View Details Modal */}
            {viewingBooking && !showForm && (
                <div className="card animation-fade-in" style={{ marginBottom: '20px', border: '1px solid var(--primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <h3>Booking Details</h3>
                        <button onClick={() => setViewingBooking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <p><strong>Ref ID:</strong> {viewingBooking.id}</p>
                            <p><strong>Guest:</strong> {viewingBooking.first_name} {viewingBooking.last_name}</p>
                            <p><strong>Email:</strong> {viewingBooking.email}</p>
                            <p><strong>Phone:</strong> {viewingBooking.phone || 'N/A'}</p>
                            <p><strong>Partner / Agency:</strong> {viewingBooking.partner_name || 'Direct Booking'}</p>
                        </div>
                        <div>
                            <p><strong>Property:</strong> {viewingBooking.place}</p>
                            <p><strong>Room Type:</strong> {viewingBooking.room_type}</p>
                            <p><strong>Stay:</strong> {viewingBooking.nights} Nights (Arr: {viewingBooking.arrival_date})</p>
                            <p><strong>Pax:</strong> {viewingBooking.adults} Adults, {viewingBooking.children} Children</p>
                            <p><strong>Rate Total:</strong> ${viewingBooking.rate_amount}</p>
                            <p><strong>Status:</strong> {viewingBooking.status}</p>
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        <button className="btn btn-outline" onClick={() => startEdit(viewingBooking)}>Edit</button>
                        <button className="btn btn-primary" onClick={() => goToInvoice(viewingBooking.id)}>Generate Invoice</button>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="card animation-fade-in">
                    <h3>{editingId ? 'Edit Booking' : 'New Guest Reservation'}</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <div className="form-grid">
                            <div className="form-group" style={{ gridColumn: 'span 1' }}>
                                <label>Target Hotel / Resort</label>
                                <select required value={form.hotel_id || ''} onChange={e => {
                                    const selectedId = e.target.value;
                                    const selectedHotel = hotels.find(h => h.id === selectedId);
                                    setForm({ ...form, hotel_id: selectedId, place: selectedHotel ? selectedHotel.name : 'Fasmala Resort' });
                                }}>
                                    <option value="">-- Select Property --</option>
                                    {hotels.length > 0 ? hotels.map(h => (
                                        <option key={h.id} value={h.id}>{h.name}</option>
                                    )) : (
                                        <>
                                            <option value="">No hotels found</option>
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Partner / Agency Name</label>
                                <input placeholder="Optional" value={form.partner_name || ''} onChange={e => setForm({ ...form, partner_name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input required value={form.first_name || ''} onChange={e => setForm({ ...form, first_name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input value={form.last_name || ''} onChange={e => setForm({ ...form, last_name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="tel" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Arrival Date</label>
                                <input type="date" required value={form.arrival_date || ''} onChange={e => setForm({ ...form, arrival_date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Stay Nights</label>
                                <input type="number" value={form.nights || 1} onChange={e => setForm({ ...form, nights: parseInt(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Adults</label>
                                <input type="number" min="1" value={form.adults || 1} onChange={e => setForm({ ...form, adults: parseInt(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Children</label>
                                <input type="number" min="0" value={form.children || 0} onChange={e => setForm({ ...form, children: parseInt(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Room Category</label>
                                <select value={form.room_type || 'STD'} onChange={e => setForm({ ...form, room_type: e.target.value })}>
                                    <option value="STD">Standard Room</option>
                                    <option value="DLX">Deluxe Room</option>
                                    <option value="SUI">Executive Suite</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Daily Sell Rate ($)</label>
                                <input type="number" value={form.rate_amount || 0} onChange={e => setForm({ ...form, rate_amount: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Net Cost / COGS ($)</label>
                                <input type="number" value={form.cost_amount || 0} onChange={e => setForm({ ...form, cost_amount: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Resort Invoice (URL)</label>
                                <input placeholder="https://..." value={form.supplier_invoice || ''} onChange={e => setForm({ ...form, supplier_invoice: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select value={form.status || 'CONFIRMED'} onChange={e => setForm({ ...form, status: e.target.value })}>
                                    <option value="CONFIRMED">Confirmed</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="btn btn-success">
                                <Save size={18} /> {editingId ? 'Update Booking' : 'Save Reservation'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Hotel / Place</th>
                                <th>Partner</th>
                                <th>Guest Details</th>
                                <th>Schedule</th>
                                <th>Pax</th>
                                <th>Rate</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(item => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{item.place || 'Fasmala Resort'}</td>
                                    <td style={{ fontSize: '0.9rem', color: '#64748b' }}>{item.partner_name || '-'}</td>
                                    <td>
                                        <div style={{ fontWeight: 'bold' }}>{item.first_name} {item.last_name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{item.email}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem' }}>{item.arrival_date}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{item.nights} nights</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.9rem' }}>{item.adults}A, {item.children}C</div>
                                    </td>
                                    <td>
                                        <div>Sell: ${item.rate_amount}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#dc2626' }}>Cost: ${item.cost_amount || 0}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 'bold' }}>
                                            Profit: ${((item.rate_amount || 0) - (item.cost_amount || 0)).toFixed(2)}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${item.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button onClick={() => handleView(item)} title="View Info" style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}><Eye size={16} /></button>
                                            <button onClick={() => goToInvoice(item.id)} title="Invoice" style={{ background: 'none', border: 'none', color: 'var(--secondary)', cursor: 'pointer' }}><FileText size={16} /></button>
                                            <button onClick={() => startEdit(item)} title="Edit" style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit3 size={16} /></button>
                                            <button onClick={() => handleDelete(item.id)} title="Delete" style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && <tr><td colSpan="8" style={{ textAlign: 'center', padding: '50px', color: 'var(--text-light)' }}>No bookings found. Start by adding a reservation.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
