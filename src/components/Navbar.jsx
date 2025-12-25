import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Add these fonts in your index.html or _app.js / layout.tsx
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=sans-serif:wght@300;400;500&display=swap" rel="stylesheet"/>

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Destinations', href: '#destinations' },
        { name: 'Experiences', href: '#experiences' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            {/* Add this in <head> of your index.html or via next/font if using Next.js */}
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=sans-serif:wght@300;400;500&display=swap"
                rel="stylesheet"
            />

            <nav
                className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
                    isScrolled 
                        ? 'bg-[#2C1810]/95 backdrop-blur-md shadow-xl py-4' 
                        : 'bg-transparent py-8'
                }`}
                style={{ fontFamily: 'font-serif italic' }}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo - Exactly like your banner */}
                    <a href="#" className="relative">
                        <h1 
                            className="text-4xl md:text-5xl tracking-widest text-white"
                            style={{ fontFamily: 'Playfair Display, sans-serif ExtraLight/300', fontWeight: 900 }}
                        >
                            Fasmala<span className="text-[#E86A33] ml-1">Travels</span>
                        </h1>
                        <p 
                            className="absolute -bottom-6 left-0 text-xs tracking-[0.4em] text-white/70"
                            style={{ fontFamily: 'sans-serif', fontWeight: 300 }}
                        >
                            CURATING PARADISE SINCE 2024
                        </p>
                    </a>

                    {/* Desktop Menu - Elegant thin uppercase */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative text-white text-sm uppercase tracking-[0.3em] hover:text-[#E86A33] transition-all duration-300
                                         after:absolute after:bottom-[-10px] after:left-0 after:w-0 after:h-px 
                                         after:bg-[#E86A33] after:transition-all after:duration-500
                                         hover:after:w-full"
                                style={{ 
                                    fontFamily: 'sans-serif',
                                    fontWeight: 300,
                                    letterSpacing: '0.3em',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="ml-8 px-10 py-3.5 bg-[#E86A33] text-white uppercase tracking-[0.2em] text-sm rounded-none hover:bg-[#d15a2a] transition-all duration-300"
                                style={{ fontFamily: 'sans-serif', fontWeight: 500 }}>
                            Inquire Now
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white hover:text-[#E86A33]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden absolute top-full left-0 w-full bg-[#2C1810]/98 backdrop-blur-lg"
                            style={{ fontFamily: 'sans-serif' }}
                        >
                            <div className="py-16 flex flex-col items-center space-y-10">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-2xl tracking-[0.4em] text-white hover:text-[#E86A33] transition"
                                        style={{ fontWeight: 300 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <button className="px-16 py-4 bg-[#E86A33] text-white uppercase tracking-[0.3em] text-lg hover:bg-[#d15a2a] transition"
                                        style={{ fontWeight: 500 }}>
                                    Inquire Now
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
