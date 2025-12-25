// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Close mobile menu when changing page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Detect if we're at the top of the homepage (dark hero)
  const isHeroSection = location.pathname === '/' && !scrolled;

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch user session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Collection', path: '/collection' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-6 lg:px-20 py-6 flex justify-between items-center">

          {/* Logo */}
          <Link to="/">
            <img
              src="/logo.png"
              alt="Fasmala Travels"
              className="h-12 md:h-15 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12 lg:space-x-16">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-lg font-medium transition-colors ${isHeroSection
                    ? 'text-white/85 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {link.name}

                {/* Orange underline ONLY on active page */}
                {isActive(link.path) && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                )}
              </Link>
            ))}

            <Link
              to="/contact"
              className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Us
            </Link>

            {user ? (
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 text-lg font-medium transition-colors ${isHeroSection ? 'text-white/85 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <User size={18} />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className={`text-lg font-medium transition-colors ${isHeroSection ? 'text-white/85 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Staff Access
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden text-3xl ${isHeroSection ? 'text-white' : 'text-gray-800'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-2xl border-t">
            <div className="container mx-auto px-6 py-10 flex flex-col space-y-8 text-center">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-2xl font-medium transition-colors ${isActive(link.path)
                        ? 'text-orange-500'
                        : 'text-gray-700 hover:text-orange-500'
                      }`}
                  >
                    {link.name}
                  </Link>
                  {isActive(link.path) && (
                    <div className="mx-auto mt-2 w-16 h-0.5 bg-orange-500 rounded-full" />
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="mx-auto px-12 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-xl text-lg"
              >
                Contact Us
              </Link>
              {user ? (
                <Link
                  to="/dashboard"
                  className="text-2xl font-medium text-gray-700 hover:text-orange-500 flex items-center justify-center gap-2"
                >
                  <User size={24} /> Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-2xl font-medium text-gray-700 hover:text-orange-500"
                >
                  Staff Access
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
