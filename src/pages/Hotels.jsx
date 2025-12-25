import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit3, Save, X, Building } from 'lucide-react'
import api from '../utils/api'

export default function Hotels() {
    const [hotels, setHotels] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(true)

    const initialForm = {
        name: '', type: 'Resort', contact_email: '', phone: '', website: '', logo_url: ''
    }
    const [form, setForm] = useState(initialForm)

    useEffect(() => {
        fetchHotels()
    }, [])

    const fetchHotels = async () => {
        setLoading(true)
        try {
            const data = await api.get('hotels')
            setHotels(data)
        } catch (error) {
            console.error('Failed to fetch hotels:', error)
        }
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingId) {
                await api.put('hotels', editingId, form)
            } else {
                await api.post('hotels', form)
            }
            setShowForm(false)
            setEditingId(null)
            setForm(initialForm)
            fetchHotels()
        } catch (error) {
            alert('Operation failed')
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this property?')) return
        await api.delete('hotels', id)
        fetchHotels()
    }

    const startEdit = (item) => {
        setEditingId(item.id)
        setForm(item)
        setShowForm(true)
    }

    if (loading && hotels.length === 0) return <div style={{ padding: '20px' }}>Loading Properties...</div>

    return (
        <div className="animation-fade-in">
            <div className="title-row">
                <h1>Resort Properties</h1>
                <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(initialForm); }}>
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? 'Close' : 'Add New Property'}
                </button>
            </div>

            {showForm && (
                <div className="card animation-fade-in">
                    <h3>{editingId ? 'Edit Property' : 'Register New Property'}</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Property Name</label>
                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Angsana Velavaru" />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                    <option value="Resort">Resort</option>
                                    <option value="Hotel">Hotel</option>
                                    <option value="GuestHouse">Guest House</option>
                                    <option value="Liveaboard">Liveaboard</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Email (Reservations)</label>
                                <input type="email" value={form.contact_email || ''} onChange={e => setForm({ ...form, contact_email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Website</label>
                                <input value={form.website || ''} onChange={e => setForm({ ...form, website: e.target.value })} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="btn btn-success">
                                <Save size={18} /> Save Property
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
                                <th>Name</th>
                                <th>Type</th>
                                <th>Contact</th>
                                <th>Website</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map(item => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Building size={16} /> {item.name}
                                        </div>
                                    </td>
                                    <td><span className="badge badge-primary">{item.type}</span></td>
                                    <td style={{ fontSize: '0.9rem' }}>
                                        <div>{item.contact_email}</div>
                                        <div style={{ color: 'var(--text-light)' }}>{item.phone}</div>
                                    </td>
                                    <td><a href={item.website} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>{item.website}</a></td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button title="Edit" onClick={() => startEdit(item)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit3 size={16} /></button>
                                            <button title="Delete" onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {hotels.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '50px', color: 'var(--text-light)' }}>No properties registered yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
