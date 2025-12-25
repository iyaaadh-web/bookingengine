import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { Lock, User, Mail } from 'lucide-react'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error
            navigate('/dashboard')
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
            <div className="card animation-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary p-3 rounded-2xl">
                            <Lock size={32} color="white" />
                        </div>
                    </div>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>Architect</h2>
                    <p className="text-muted text-sm">Welcome back! Please login to your account.</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Email Address</label>
                        <div className="flex items-center gap-3 px-4 py-3 bg-light rounded-lg border focus-within:border-primary transition-colors">
                            <Mail size={18} color="#adb5bd" />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ background: 'none', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Password</label>
                        <div className="flex items-center gap-3 px-4 py-3 bg-light rounded-lg border focus-within:border-primary transition-colors">
                            <Lock size={18} color="#adb5bd" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ background: 'none', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" /> Keep me logged in
                        </label>
                        <a href="#" className="text-primary font-bold">Forgot Password?</a>
                    </div>

                    <button className="btn primary-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem', borderRadius: '0.75rem' }}>
                        {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t text-center">
                    <p className="text-xs text-muted">Don't have an account? <a href="#" className="text-primary font-bold">Contact Admin</a></p>
                </div>
            </div>
        </div>
    )
}
