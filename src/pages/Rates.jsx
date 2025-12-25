import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit3, Save, X, Printer } from 'lucide-react'
import api from '../utils/api'

export default function Rates() {
    const [rates, setRates] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [printMode, setPrintMode] = useState(null)

    const initialForm = {
        name: '', place: 'Fasmala Resort', valid_from: '', valid_to: '',
        room_type: 'STD', meal_plan: 'BB',
        single_rate: 0, double_rate: 0, triple_rate: 0,
        meal_supplement: 0, transfer_price: 0
    }
    const [form, setForm] = useState(initialForm)
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        fetchRates()
        fetchHotels()
    }, [])

    const fetchHotels = async () => {
        try { const data = await api.get('hotels'); setHotels(data) } catch (e) { }
    }

    const fetchRates = async () => {
        setLoading(true)
        const data = await api.get('rates')
        setRates(data)
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editingId) {
            await api.put('rates', editingId, form)
        } else {
            await api.post('rates', form)
        }
        setShowForm(false)
        setEditingId(null)
        setForm(initialForm)
        fetchRates()
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this rate?')) return
        await api.delete('rates', id)
        fetchRates()
    }

    const startEdit = (item) => {
        setEditingId(item.id)
        setForm(item)
        setShowForm(true)
    }

    if (printMode) {
        const item = rates.find(r => r.id === printMode)
        const relatedRates = rates.filter(r => r.place === item.place && r.name === item.name)

        return (
            <div className="rate-sheet-print" style={{ padding: '20px', background: 'white', minHeight: '100vh', color: '#333', fontFamily: 'serif' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <button className="btn btn-outline mb-6 no-print" onClick={() => setPrintMode(null)}>Back to Rates</button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                        <div style={{ paddingTop: '20px' }}>
                            <p><strong>Hotel:</strong> {item.place}</p>
                            <p><strong>Rates:</strong> {item.name}</p>
                            <p><strong>Currency:</strong> USD</p>
                        </div>
                        <div style={{ background: '#f59e0b', color: 'white', padding: '20px', borderRadius: '4px', textAlign: 'center', width: '350px' }}>
                            <h2 style={{ margin: 0, letterSpacing: '2px' }}>FASMALA TRAVELS</h2>
                            <p style={{ fontSize: '0.7rem', margin: '5px 0' }}>PART OF FASMALA PVT LTD</p>
                            <div style={{ fontSize: '0.8rem', textAlign: 'left', marginTop: '10px' }}>
                                <div>M.Laalubaagu Irumatheebai, Asuruma Goalhi, Male'</div>
                                <div>☎: 7498616 ✆: 9387414</div>
                                <div>✉: sales@fasmala.com</div>
                                <div>🌐: www.fasmala.com / travels.fasmala.com</div>
                            </div>
                        </div>
                    </div>

                    <table className="rate-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #f59e0b' }}>
                        <thead>
                            <tr style={{ background: '#f59e0b', color: 'white' }}>
                                <th style={{ border: '1px solid #fff', padding: '8px' }}>Period</th>
                                <th style={{ border: '1px solid #fff', padding: '8px' }}>Room name</th>
                                <th style={{ border: '1px solid #fff', padding: '8px' }}>Single</th>
                                <th style={{ border: '1px solid #fff', padding: '8px' }}>Double</th>
                                <th style={{ border: '1px solid #fff', padding: '8px' }}>Triple</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relatedRates.map((rate, index) => (
                                <tr key={rate.id}>
                                    {index === 0 && (
                                        <td rowSpan={relatedRates.length} style={{ border: '1px solid #f59e0b', textAlign: 'center', padding: '10px', verticalAlign: 'middle' }}>
                                            {rate.valid_from} — {rate.valid_to}
                                        </td>
                                    )}
                                    <td style={{ border: '1px solid #f59e0b', padding: '8px' }}>{rate.room_type} ({rate.meal_plan})</td>
                                    <td style={{ border: '1px solid #f59e0b', padding: '8px', textAlign: 'center' }}>${rate.single_rate}</td>
                                    <td style={{ border: '1px solid #f59e0b', padding: '8px', textAlign: 'center' }}>${rate.double_rate}</td>
                                    <td style={{ border: '1px solid #f59e0b', padding: '8px', textAlign: 'center' }}>${rate.triple_rate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '30px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        <ul style={{ paddingLeft: '20px' }}>
                            <li>All the above rates are on double occupancy, inclusive of Return airport combine transfer (${relatedRates[0]?.transfer_price || 0} pp), bed & breakfast with all government taxes.</li>
                            <li>Meal Supplement: ${relatedRates[0]?.meal_supplement || 0} per person per night</li>
                            <li>All the above rates are in United States Dollars.</li>
                            <li>On arrival at Velana International Airport counter no: C18 will be met by our representative who will escort the guests.</li>
                            <li>Upon confirmation of airport transfer, our hotel will send the car/van on the requested timing of guests' arrival.</li>
                            <li>The {item.place} reserves the right to amend rates for any period within fifteen (15) days of written notice to Tour Operator.</li>
                            <li>Our check-in time is 1400hrs and check-out time is 1200hrs, Early check-in and late check-out is subject to the availability.</li>
                        </ul>
                        <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Cancellation Policy:</h4>
                        <p>Below cancellation policy is applicable for all room types and must be informed by EMAIL</p>
                        <ul style={{ paddingLeft: '20px' }}>
                            <li>3 days prior to arrival cancellations 100% of the total invoice will be charged.</li>
                            <li>3 to 7 days prior to arrival cancellations 50% of the total invoice will be charged.</li>
                            <li>7 days or later to arrival cancellations will be FREE of charge.</li>
                        </ul>
                    </div>
                </div>
                <style>{`
                    @media print { 
                        .no-print { display: none !important; } 
                        body { background: white !important; }
                        .app-shell { display: block !important; }
                        .sidebar, .topbar { display: none !important; }
                        .main-content { padding: 0 !important; margin: 0 !important; }
                    }
                `}</style>
            </div>
        )
    }

    if (loading && rates.length === 0) return <div style={{ padding: '20px' }}>Loading Rates...</div>

    return (
        <div className="animation-fade-in">
            <div className="title-row">
                <h1>Seasonal Rate Sheets</h1>
                <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(initialForm); }}>
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? 'Close' : 'Add New Seasonal Rate'}
                </button>
            </div>

            {showForm && (
                <div className="card animation-fade-in">
                    <h3>{editingId ? 'Edit Rate Detail' : 'Create New Rate Package'}</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <div className="form-grid">
                            <div className="form-group" style={{ gridColumn: 'span 1' }}>
                                <label>Target Hotel / Resort</label>
                                <select required value={form.place || 'Fasmala Resort'} onChange={e => setForm({ ...form, place: e.target.value })}>
                                    <option value="">-- Select Property --</option>
                                    {hotels.length > 0 ? hotels.map(h => (
                                        <option key={h.id} value={h.name}>{h.name}</option>
                                    )) : (
                                        <>
                                            <option value="Fasmala Resort">Fasmala Resort</option>
                                            <option value="Angsana Velavaru">Angsana Velavaru</option>
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 1' }}>
                                <label>Package / Season Name</label>
                                <input required value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Peak Season 2024" />
                            </div>
                            <div className="form-group">
                                <label>Start Date</label>
                                <input type="date" required value={form.valid_from || ''} onChange={e => setForm({ ...form, valid_from: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input type="date" required value={form.valid_to || ''} onChange={e => setForm({ ...form, valid_to: e.target.value })} />
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
                                <label>Meal Plan</label>
                                <select value={form.meal_plan || 'BB'} onChange={e => setForm({ ...form, meal_plan: e.target.value })}>
                                    <option value="BB">Bed & Breakfast (BB)</option>
                                    <option value="HB">Half Board (HB)</option>
                                    <option value="FB">Full Board (FB)</option>
                                    <option value="AI">All Inclusive (AI)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Single Rate ($)</label>
                                <input type="number" required value={form.single_rate || 0} onChange={e => setForm({ ...form, single_rate: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Double Rate ($)</label>
                                <input type="number" required value={form.double_rate || 0} onChange={e => setForm({ ...form, double_rate: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Triple Rate ($)</label>
                                <input type="number" required value={form.triple_rate || 0} onChange={e => setForm({ ...form, triple_rate: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Meal Supplement ($)</label>
                                <input type="number" value={form.meal_supplement || 0} onChange={e => setForm({ ...form, meal_supplement: parseFloat(e.target.value) })} />
                            </div>
                            <div className="form-group">
                                <label>Transfer Price ($)</label>
                                <input type="number" value={form.transfer_price || 0} onChange={e => setForm({ ...form, transfer_price: parseFloat(e.target.value) })} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="btn btn-success">
                                <Save size={18} /> Update Rate Table
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
                                <th>Place / Resort</th>
                                <th>Rate Package</th>
                                <th>Validity Period</th>
                                <th>Room & Meals</th>
                                <th>Single</th>
                                <th>Double</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rates.map(item => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{item.place || 'Fasmala Resort'}</td>
                                    <td style={{ fontWeight: 'bold' }}>{item.name}</td>
                                    <td style={{ fontSize: '0.85rem' }}>{item.valid_from} — {item.valid_to}</td>
                                    <td>{item.room_type} / {item.meal_plan}</td>
                                    <td>${item.single_rate}</td>
                                    <td>${item.double_rate}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button title="Print Rate" onClick={() => setPrintMode(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}><Printer size={16} /></button>
                                            <button title="Edit" onClick={() => startEdit(item)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit3 size={16} /></button>
                                            <button title="Delete" onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {rates.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', padding: '50px', color: 'var(--text-light)' }}>No rates defined yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
