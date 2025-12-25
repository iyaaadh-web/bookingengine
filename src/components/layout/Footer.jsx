import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <img
                            src="/logo.png"
                            alt="Fasmala Travels Logo"
                            className="h-16 w-auto mb-6"
                        />
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Curating unforgettable journeys to the Maldives' most exclusive islands. Experience luxury, adventure, and serenity.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-brand-orange transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-brand-orange transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-brand-orange transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white">Explore</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-400 hover:text-brand-orange transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-brand-orange transition-colors">About</Link></li>
                            <li><Link to="/collection" className="text-gray-400 hover:text-brand-orange transition-colors">Our Collection</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-brand-orange transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin size={20} className="text-brand-orange mt-1" />
                                <span className="text-gray-400">Male', Maldives</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-brand-orange" />
                                <span className="text-gray-400">+960 123 4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-brand-orange" />
                                <span className="text-gray-400">hello@fasmala.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold mb-6 text-white">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Subscribe for exclusive offers and travel inspiration.</p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/5 border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                            />
                            <button className="bg-brand-orange text-white font-medium px-4 py-2 hover:bg-white hover:text-brand-dark transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Fasmala Travels. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
