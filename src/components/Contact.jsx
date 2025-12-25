import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-navy text-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-serif mb-6">Contact Us</h2>
                        <p className="text-gray-300 mb-8 leading-relaxed">
                            Ready to plan your dream vacation? Our travel specialists are at your service to craft a personalized itinerary just for you.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </div>
                                <span>+960 123 4567</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <span>reservations@fasmalatravels.com</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-navy-light border border-navy-light focus:border-gold text-white px-4 py-3 rounded-sm outline-none transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-navy-light border border-navy-light focus:border-gold text-white px-4 py-3 rounded-sm outline-none transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Your Message"
                                rows="4"
                                className="w-full bg-navy-light border border-navy-light focus:border-gold text-white px-4 py-3 rounded-sm outline-none transition-colors"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-3 rounded-sm transition-colors flex items-center justify-center space-x-2"
                        >
                            <span>Send Inquiry</span>
                            <Send size={18} />
                        </button>
                    </motion.form>

                </div>
            </div>
        </section>
    );
};

export default Contact;
