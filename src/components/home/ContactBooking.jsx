import React from 'react';
import { Mail } from 'lucide-react';

const ContactBooking = () => {
    return (
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                    <div className="md:w-1/2 p-12 flex flex-col justify-center bg-brand-dark text-white">
                        <h2 className="text-3xl font-serif font-bold mb-6">Ready to Escape?</h2>
                        <p className="text-gray-300 mb-8">
                            Start planning your dream trip today. Contact us for personalized travel experiences.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Mail size={24} className="text-brand-orange" />
                                <div>
                                    <p className="text-sm text-gray-400">Email us at</p>
                                    <a href="mailto:sales@fasmala.com" className="text-xl font-semibold text-white hover:text-brand-orange transition-colors">
                                        sales@fasmala.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 p-12">
                        <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">Quick Inquiry</h3>
                        <p className="text-gray-600 mb-6">
                            Send us your details and we'll get back to you at <a href="mailto:sales@fasmala.com" className="text-brand-orange font-semibold hover:underline">sales@fasmala.com</a>
                        </p>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-orange focus:border-brand-orange outline-none h-32" placeholder="Tell us about your dream trip..."></textarea>
                            </div>
                            <button type="submit" className="w-full py-3 bg-brand-dark text-white font-medium hover:bg-brand-orange transition-colors">
                                Send Inquiry
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactBooking;
