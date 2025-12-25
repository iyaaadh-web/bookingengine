import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, AlertCircle, ArrowLeft, Loader2, ShieldCheck, Waves } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)

        // Graceful check for placeholder configuration before attempting fetch
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
            setError("Configuration Required: Please set your valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect to the live database.")
            return
        }

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
            setError(err.error_description || err.message || "Failed to connect to authentication server. Please check your internet or configuration.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-brand-dark/5 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-orange/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-orange/5 rounded-full blur-[120px]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[480px] z-10"
            >
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-orange transition-colors font-medium mb-12 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Return to Fasmala Travels</span>
                </Link>

                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 md:p-12 relative overflow-hidden">
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-orange via-orange-400 to-brand-orange"></div>

                    <div className="text-center mb-10">
                        <Link to="/" className="inline-block mb-8 hover:scale-105 transition-transform duration-300">
                            <img src="/logo.png" alt="Fasmala Travels" className="h-16 w-auto" />
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-serif font-bold text-gray-900">Staff Portal</h1>
                            <p className="text-gray-500 font-medium tracking-tight">Access management & reservations</p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, mb: 0 }}
                                animate={{ opacity: 1, height: 'auto', mb: 24 }}
                                exit={{ opacity: 0, height: 0, mb: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600">
                                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                    <p className="text-sm font-semibold">{error}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Work Email</label>
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="name@fasmala.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-orange/5 focus:border-brand-orange outline-none transition-all placeholder:text-gray-300 text-[15px] font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
                                <a href="#" className="text-xs font-bold text-brand-orange hover:text-brand-dark transition-colors">Recover Access</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-orange/5 focus:border-brand-orange outline-none transition-all placeholder:text-gray-300 text-[15px] font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full py-4.5 bg-brand-dark text-white rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] mt-8 disabled:opacity-70 disabled:cursor-not-allowed group h-[60px]"
                        >
                            {loading ? (
                                <Loader2 size={24} className="animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In to Dashboard</span>
                                    <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-50 text-center">
                        <p className="text-sm text-gray-400 font-medium">
                            Authorized personnel only. <br />
                            <a href="mailto:it@fasmala.com" className="text-brand-orange font-bold hover:underline inline-flex items-center gap-1 mt-2">
                                <Waves size={14} /> Request Access
                            </a>
                        </p>
                    </div>
                </div>
            </motion.div>

            <footer className="mt-12 text-gray-400 text-xs font-medium tracking-[0.2em] uppercase z-10">
                &copy; 2024 Fasmala Travels & Tours Pvt Ltd
            </footer>
        </div>
    )
}
