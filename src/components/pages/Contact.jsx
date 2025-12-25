import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-24 pb-20 bg-white min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-bold text-brand-dark mb-4">Get in Touch</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Ready to start planning your dream trip? Our team is here to answer any questions you may have.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Contact Info */}
                    <div className="w-full lg:w-1/3 space-y-8">
                        <div className="bg-brand-light p-8 rounded-xl">
                            <h3 className="text-xl font-serif font-bold text-brand-dark mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-orange shadow-sm shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Phone</p>
                                        <p className="text-brand-dark font-medium text-lg">+960 123 4567</p>
                                        <p className="text-gray-500 text-sm">Mon-Sun, 9am - 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-orange shadow-sm shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Email</p>
                                        <p className="text-brand-dark font-medium text-lg">hello@fasmala.com</p>
                                        <p className="text-gray-500 text-sm">24/7 Support</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-orange shadow-sm shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Office</p>
                                        <p className="text-brand-dark font-medium text-lg">H. Fasmala Building</p>
                                        <p className="text-gray-500 text-sm">Male', Maldives</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full lg:w-2/3">
                        <form className="bg-white border border-gray-100 rounded-xl shadow-lg p-8 md:p-10">
                            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-8">Send us a Message</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all h-40" placeholder="Tell us about your travel plans..."></textarea>
                            </div>

                            <button className="w-full py-4 bg-brand-orange text-white font-bold tracking-wider rounded-lg hover:bg-brand-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
