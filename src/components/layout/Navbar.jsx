import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Shield, ArrowRight, Compass } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Close mobile menu when changing page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch user session safely
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      console.warn('Supabase not configured. Auth listeners disabled.');
      return;
    }

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Error fetching session:', err);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Collection', path: '/collection' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHeroPage = location.pathname === '/';
  const navbarTheme = (isHeroPage && !scrolled && !isMobileMenuOpen) ? 'transparent' : 'solid';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${navbarTheme === 'solid'
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-4 shadow-sm'
        : 'bg-transparent py-8'
      }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="relative z-10 group">
          <img
            src="/logo.png"
            alt="Fasmala Travels"
            className={`h-12 md:h-14 transition-all duration-500 ${navbarTheme === 'transparent' ? 'brightness-0 invert' : ''
              }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[13px] font-black uppercase tracking-[0.2em] transition-all hover:text-brand-orange relative group ${navbarTheme === 'transparent' ? 'text-white/80' : 'text-gray-500'
                  }`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200/30"></div>

          <div className="flex items-center gap-6">
            {user ? (
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 group ${navbarTheme === 'transparent' ? 'text-white' : 'text-brand-dark'
                  }`}
              >
                <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Shield size={18} />
                </div>
                <div className="hidden lg:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Staff</p>
                  <p className="text-sm font-bold">Dashboard</p>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-colors hover:text-brand-orange ${navbarTheme === 'transparent' ? 'text-white/80' : 'text-gray-500'
                  }`}
              >
                <Compass size={18} />
                <span>Access Portal</span>
              </Link>
            )}

            <Link
              to="/collection"
              className="bg-brand-orange text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(242,102,34,0.2)] hover:shadow-[0_15px_30px_rgba(242,102,34,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
            >
              <span>Book Now</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden relative z-10 p-2 transition-colors ${navbarTheme === 'transparent' && !isMobileMenuOpen ? 'text-white' : 'text-brand-dark'
            }`}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 md:hidden pt-32 px-6"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-4xl font-serif font-bold text-brand-dark"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-gray-100 my-4"></div>
              <Link
                to="/login"
                className="flex items-center gap-3 text-brand-orange font-black uppercase tracking-widest"
              >
                <Shield size={20} />
                <span>Staff Portal Access</span>
              </Link>
              <Link
                to="/collection"
                className="w-full py-6 bg-brand-orange text-white rounded-3xl font-black uppercase tracking-widest text-center shadow-2xl"
              >
                Explorer Collection
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
