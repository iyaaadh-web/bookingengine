import React, { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import {
    LayoutDashboard,
    Calendar,
    Tag,
    FileText,
    History,
    LogOut,
    Menu,
    User,
    Book,
    PieChart,
    CreditCard
} from 'lucide-react'
import { supabase } from '../supabaseClient'

export default function Layout() {
    const location = useLocation()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Book, label: 'Resorts', path: '/hotels' },
        { icon: Calendar, label: 'Reservations', path: '/bookings' },
        { icon: Tag, label: 'Pricing', path: '/rates' },
        { icon: FileText, label: 'Billing', path: '/invoices' },
        { icon: CreditCard, label: 'Expenses', path: '/expenses' },
        { icon: PieChart, label: 'Analytics', path: '/reports' },
        { icon: History, label: 'History', path: '/history' },
    ]

    return (
        <div className="app-shell">
            {/* Sidebar */}
            <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <div className="sidebar-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 10px', marginBottom: '10px' }}>
                    <img src="/logo.png" alt="Fasmala Travels" style={{ maxWidth: '100%', height: 'auto', maxHeight: '60px', objectFit: 'contain' }} />
                </div>
                <nav>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={location.pathname === item.path ? 'active' : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div style={{ padding: '20px', borderTop: '1px solid #1e293b' }}>
                    <button
                        onClick={handleLogout}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Section */}
            <div className="main-content">
                <header className="topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Menu size={24} color="#64748b" />
                        </button>
                        <h2 style={{ fontSize: '1.1rem' }}>Fasmala Travel Management</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Admin User</span>
                        <div style={{ background: '#f1f5f9', padding: '5px', borderRadius: '50%' }}>
                            <User size={20} />
                        </div>
                    </div>
                </header>

                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
