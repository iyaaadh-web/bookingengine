import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Save, X } from 'lucide-react'
import api from '../utils/api'

export default function Expenses() {
    const [expenses, setExpenses] = useState([])
    const [hotels, setHotels] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(true)

    const initialForm = {
        hotel_id: '',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Operational',
        attachment_url: ''
    }
    const [form, setForm] = useState(initialForm)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [expensesData, hotelsData] = await Promise.all([
                api.get('expenses'),
                api.get('hotels')
            ])
            setExpenses(expensesData || [])
            setHotels(hotelsData || [])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('expenses', form)
            setShowForm(false)
            setForm(initialForm)
            fetchData()
        } catch (error) {
            console.error('Error saving expense:', error)
            alert('Failed to save expense')
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this expense?')) return
        try {
            await api.delete('expenses', id)
            fetchData()
        } catch (error) {
            console.error('Error deleting expense:', error)
        }
    }

    const getHotelName = (id) => {
        const hotel = hotels.find(h => h.id === id)
        return hotel ? hotel.name : 'General / Unassigned'
    }

    if (loading) return <div style={{ padding: '20px' }}>Loading Expenses...</div>

    return (
        <div className="animation-fade-in">
            <div className="title-row">
                <h1>Expenses Management</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? 'Close' : 'Add Expense'}
                </button>
            </div>

            {showForm && (
                <div className="card shadow animation-fade-in">
                    <h3>Record New Expense</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Hotel / Property</label>
                                <select value={form.hotel_id} onChange={e => setForm({ ...form, hotel_id: e.target.value })}>
                                    <option value="">-- General / Corporate --</option>
                                    {hotels.map(h => (
                                        <option key={h.id} value={h.id}>{h.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input required placeholder="e.g. Utility Bill, Maintenance" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    <option value="Operational">Operational</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Amount ($)</label>
                                <input type="number" step="0.01" required value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Attachment (URL)</label>
                                <input placeholder="https://..." value={form.attachment_url} onChange={e => setForm({ ...form, attachment_url: e.target.value })} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="btn btn-success">
                                <Save size={18} /> Save Expense
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
                                <th>Date</th>
                                <th>Property</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th style={{ textAlign: 'center' }}>Ref</th>
                                <th style={{ textAlign: 'right' }}>Amount</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(item => (
                                <tr key={item.id}>
                                    <td>{item.date}</td>
                                    <td style={{ fontWeight: '500', color: 'var(--primary)' }}>{getHotelName(item.hotel_id)}</td>
                                    <td>{item.description}</td>
                                    <td><span className="badge badge-outline">{item.category}</span></td>
                                    <td style={{ textAlign: 'center' }}>
                                        {item.attachment_url && (
                                            <a href={item.attachment_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }} title="View Receipt">
                                                Attachment
                                            </a>
                                        )}
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>${parseFloat(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button onClick={() => handleDelete(item.id)} title="Delete" style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {expenses.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '50px', color: 'var(--text-light)' }}>
                                        No expenses recorded yet.
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
