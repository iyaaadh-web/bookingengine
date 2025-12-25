import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error
            navigate('/dashboard')
        } catch (err) {
            console.error('Login error:', err)
            setError(err.error_description || err.message || "Invalid credentials. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fff5eb 0%, #ffffff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(245, 158, 11, 0.1)',
                padding: '48px 40px',
                border: '1px solid rgba(245, 158, 11, 0.1)'
            }}>
                {/* Logo and Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
                    }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: '8px',
                        letterSpacing: '-0.5px'
                    }}>
                        Fasmala Travels
                    </h1>
                    <p style={{
                        fontSize: '15px',
                        color: '#6b7280',
                        fontWeight: '400'
                    }}>
                        Staff Portal Access
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                    }}>
                        <AlertCircle size={18} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '14px', color: '#991b1b', lineHeight: '1.5' }}>{error}</span>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Email Address
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{
                                position: 'absolute',
                                left: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9ca3af'
                            }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@fasmala.com"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 14px 12px 44px',
                                    fontSize: '15px',
                                    border: '1.5px solid #e5e7eb',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{
                                position: 'absolute',
                                left: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9ca3af'
                            }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 14px 12px 44px',
                                    fontSize: '15px',
                                    border: '1.5px solid #e5e7eb',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: loading ? '#d1d5db' : 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: '600',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                            boxShadow: loading ? 'none' : '0 4px 12px rgba(245, 158, 11, 0.3)',
                            fontFamily: 'inherit'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-1px)'
                                e.target.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)'
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <span>Sign In to Portal</span>
                        )}
                    </button>
                </form>

                {/* Footer Links */}
                <div style={{
                    marginTop: '32px',
                    paddingTop: '24px',
                    borderTop: '1px solid #f3f4f6',
                    textAlign: 'center'
                }}>
                    <Link
                        to="/"
                        style={{
                            fontSize: '14px',
                            color: '#f59e0b',
                            textDecoration: 'none',
                            fontWeight: '500',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#ea580c'}
                        onMouseLeave={(e) => e.target.style.color = '#f59e0b'}
                    >
                        ← Back to Website
                    </Link>
                </div>

                {/* Demo Credentials */}
                <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: '#fef3c7',
                    borderRadius: '8px',
                    border: '1px solid #fde68a'
                }}>
                    <p style={{ fontSize: '12px', color: '#92400e', fontWeight: '600', marginBottom: '6px' }}>
                        Demo Credentials:
                    </p>
                    <p style={{ fontSize: '12px', color: '#78350f', lineHeight: '1.6', margin: 0 }}>
                        Email: admin@fasmala.com<br />
                        Password: admin12345
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
