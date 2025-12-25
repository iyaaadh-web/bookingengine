import React, { useState, useEffect } from 'react'
import { Plus, Printer, CheckCircle, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import api from '../utils/api'
import { ToWords } from 'to-words';

export default function Invoices() {
    const location = useLocation()
    const [invoices, setInvoices] = useState([])
    const [bookings, setBookings] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [printMode, setPrintMode] = useState(null)
    const [form, setForm] = useState({ booking_id: '', amount: 0, green_tax_per_pax: 6, tgst_percent: 16 })
    const toWords = new ToWords({ localeCode: 'en-US' });

    useEffect(() => {
        fetchData()
    }, [])

    // Check for navigation state to auto-open form
    useEffect(() => {
        if (location.state?.bookingId && bookings.length > 0) {
            const bId = location.state.bookingId
            const booking = bookings.find(b => b.id === bId)
            if (booking) {
                setForm(prev => ({ ...prev, booking_id: bId, amount: booking.rate_amount || 0 }))
                setShowForm(true)
                // Clear state so it doesn't reopen on refresh
                window.history.replaceState({}, document.title)
            }
        }
    }, [bookings, location.state])

    const fetchData = async () => {
        try {
            const [invs, books] = await Promise.all([
                api.get('invoices'),
                api.get('bookings')
            ])
            setInvoices(invs)
            setBookings(books)
        } catch (e) { console.error(e) }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await api.post('invoices', form)
        setShowForm(false)
        fetchData()
    }

    const markAsPaid = async (item) => {
        await api.put('invoices', item.id, { ...item, paid: true })
        fetchData()
    }

    if (printMode) {
        const inv = invoices.find(i => i.id === printMode)
        const booking = bookings.find(b => b.id === inv.booking_id)

        // Calculations
        const paxCount = (booking?.adults || 0) + (booking?.children || 0)
        const greenTax = (inv.green_tax_per_pax || 6) * paxCount * (booking?.nights || 1)
        const totalAmount = inv.amount
        const taxableAmount = (totalAmount - greenTax) / (1 + ((inv.tgst_percent || 16) / 100))
        const tgst = totalAmount - greenTax - taxableAmount
        const bankCharges = 30 // Hardcoded for now based on image usually

        const grandTotal = totalAmount + bankCharges

        return (
            <div className="invoice-print-container" style={{ padding: '40px', background: 'white', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
                <style>{`
                    @media print { 
                        .no-print { display: none !important; } 
                        body { background: white !important; }
                        .app-shell { display: block !important; }
                        .sidebar, .topbar { display: none !important; }
                        .main-content { padding: 0 !important; margin: 0 !important; }
                        .page-content { padding: 0 !important; }
                    }
                    .invoice-grid th { text-align: left; padding: 5px; border-bottom: 2px solid black; }
                    .invoice-grid td { padding: 8px 5px; vertical-align: top; }
                    .totals-row td { padding: 5px; text-align: right; }
                `}</style>

                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <button className="btn btn-outline mb-8 no-print" onClick={() => setPrintMode(null)}>Return to Invoices</button>

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                        <div style={{ width: '400px', border: '1px solid black', height: '100px' }}>
                            {/* Logo Placeholder */}
                        </div>
                        <div style={{ textAlign: 'left', minWidth: '250px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '5px' }}>
                                <strong>TIN No:</strong> <span>1016845GST501</span>
                                <strong>Invoice No:</strong> <span>{inv.invoice_no || inv.id?.slice(0, 8).toUpperCase()}</span>
                                <strong>Invoice Date:</strong> <span>{new Date(inv.created_at).toLocaleDateString()}</span>
                                <strong>Invoice Due Date:</strong> <span>{new Date(inv.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <strong>Guest Name: {booking?.first_name} {booking?.last_name}</strong>
                    </div>

                    {/* Main Table */}
                    <table className="invoice-grid" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                        <thead>
                            <tr>
                                <th>Arr. Date</th>
                                <th>Dep. Date</th>
                                <th>Details</th>
                                <th>Meal Plan</th>
                                <th>No. of Pax</th>
                                <th>Bed Nts</th>
                                <th>Rate USD</th>
                                <th style={{ textAlign: 'right' }}>Amount in USD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{booking?.arrival_date}</td>
                                <td>{booking?.departure_date}</td>
                                <td>{booking?.place} - {booking?.nights}N {booking?.room_type}</td>
                                <td>{booking?.meal_plan || 'FB'}</td>
                                <td>{paxCount}</td>
                                <td>{booking?.nights}</td>
                                <td></td>
                                <td style={{ textAlign: 'right' }}>{totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Totals Section */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <table style={{ width: '400px' }}>
                            <tbody className="totals-row">
                                <tr>
                                    <td>Green Tax:</td>
                                    <td>{greenTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                </tr>
                                <tr>
                                    <td>Total Taxable Amount:</td>
                                    <td>{taxableAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                </tr>
                                <tr>
                                    <td>Goods & Services Tax @{inv.tgst_percent || 16}%:</td>
                                    <td>{tgst.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                </tr>
                                <tr>
                                    <td>Bank Charges:</td>
                                    <td>{bankCharges.toFixed(2)}</td>
                                </tr>
                                <tr style={{ background: '#d1d5db', borderTop: '2px solid black', borderBottom: '2px double black', fontWeight: 'bold' }}>
                                    <td style={{ padding: '10px' }}>Grand Total</td>
                                    <td style={{ padding: '10px' }}>{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: '30px', fontWeight: 'bold' }}>
                        Amount in words: US$ <span style={{ marginLeft: '20px', textTransform: 'capitalize' }}>{toWords.convert(grandTotal)} only</span>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className="animation-fade-in">
            <div className="title-row">
                <h1>Invoices & Billings</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? 'Close' : 'Generate New Invoice'}
                </button>
            </div>

            {showForm && (
                <div className="card shadow animation-fade-in">
                    <h3>Draft New Guest Invoice</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Selection of Booking</label>
                                <select required value={form.booking_id} onChange={e => setForm({ ...form, booking_id: e.target.value })}>
                                    <option value="">-- Choose Recent Guest --</option>
                                    {bookings.map(b => (
                                        <option key={b.id} value={b.id}>{b.first_name} {b.last_name} ({b.arrival_date})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Total Amount ($)</label>
                                <input type="number" required value={form.amount} onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Green Tax per Pax ($)</label>
                                <input type="number" value={form.green_tax_per_pax} onChange={e => setForm({ ...form, green_tax_per_pax: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>TGST %</label>
                                <input type="number" value={form.tgst_percent} onChange={e => setForm({ ...form, tgst_percent: parseFloat(e.target.value) })} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button type="submit" className="btn btn-success">Issue Invoice</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Invoice Number</th>
                                <th>Guest Identity</th>
                                <th>Billing</th>
                                <th>Payment Status</th>
                                <th>Issue Date</th>
                                <th style={{ textAlign: 'center' }}>Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(inv => {
                                const booking = bookings.find(b => b.id === inv.booking_id)
                                return (
                                    <tr key={inv.id}>
                                        <td style={{ fontWeight: '600' }}>#{inv.invoice_no || inv.id?.slice(0, 8)}</td>
                                        <td>
                                            {booking ? (
                                                <div>
                                                    <div>{booking.first_name} {booking.last_name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>{booking.place}</div>
                                                </div>
                                            ) : <span style={{ color: 'var(--danger)' }}>Guest Record Missing</span>}
                                        </td>
                                        <td>${inv.amount?.toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${inv.paid ? 'badge-success' : 'badge-warning'}`}>
                                                {inv.paid ? 'FULLY PAID' : 'PENDING'}
                                            </span>
                                        </td>
                                        <td>{new Date(inv.created_at).toLocaleDateString()}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                                {!inv.paid && (
                                                    <button title="Mark as Paid" onClick={() => markAsPaid(inv)} style={{ background: 'none', border: 'none', color: 'var(--success)', cursor: 'pointer' }}>
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                                <button title="Print View" onClick={() => setPrintMode(inv.id)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}>
                                                    <Printer size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {invoices.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '50px', color: 'var(--text-light)' }}>No invoice records found. Create one from an existing booking.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
