import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, ChevronRight, Heart, Sparkles, ShieldCheck } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1578922746465-3a80a228f28f?q=80&w=2074&auto=format&fit=crop"
                        alt="Maldives Paradise"
                        className="w-full h-full object-cover opacity-60 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-white"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-brand-orange mb-8"
                        >
                            <span className="w-16 h-px bg-brand-orange"></span>
                            <span className="uppercase tracking-[0.4em] text-xs font-black">Est. 2012</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-7xl md:text-9xl font-serif font-bold text-white mb-10 leading-[0.85]"
                        >
                            The Art of <br />
                            <span className="text-brand-orange italic font-light">Escapism.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-300 text-xl md:text-2xl font-light leading-relaxed max-w-2xl"
                        >
                            Fasmala Travels is an award-winning luxury gateway, dedicated to curating the most extraordinary Maldivian narratives for the discerning global traveler.
                        </motion.p>
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-px h-24 bg-gradient-to-b from-white/50 to-transparent"></div>
                </div>
            </section>

            {/* Heritage Section */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="w-full lg:w-1/2">
                            <div className="relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1976&auto=format&fit=crop"
                                        alt="Local Wisdom"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-orange rounded-[2rem] p-10 flex flex-col justify-center text-white shadow-2xl">
                                    <p className="text-5xl font-serif font-bold mb-2">12+</p>
                                    <p className="uppercase tracking-widest text-xs font-black opacity-80">Years of Excellence</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <h2 className="text-5xl font-serif font-bold text-brand-dark mb-10 leading-tight">
                                Born in the Islands, <br />
                                <span className="text-brand-orange italic">Raised by the Ocean.</span>
                            </h2>
                            <div className="space-y-8 text-lg text-gray-600 font-light leading-relaxed">
                                <p>
                                    Founded by Maldivian traditionalists with a vision for modern luxury, we bridge the gap between authentic island heritage and contemporary sophistication.
                                </p>
                                <p>
                                    Our collection represents more than just resorts; they are curated sanctuaries where privacy is the ultimate currency and service is an unspoken promise.
                                </p>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-orange">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-dark">Local Vision</p>
                                        <p className="text-sm text-gray-500">100% Maldivian Owned</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-orange">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-dark">Concierge</p>
                                        <p className="text-sm text-gray-500">24/7 Personal Service</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-32 bg-brand-dark text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl font-serif font-bold mb-8"
                        >
                            The Fasmala <span className="text-brand-orange italic">Philosophy</span>
                        </motion.h2>
                        <p className="text-gray-400 text-xl font-light">
                            We believe that luxury is not a destination, but a state of mind achieved through meticulous attention to detail and genuine hospitality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            {
                                icon: <Sparkles className="w-10 h-10" />,
                                title: "Bespoke Curation",
                                desc: "Every itinerary is a blank canvas, painted with your unique desires and our insider expertise."
                            },
                            {
                                icon: <ShieldCheck className="w-10 h-10" />,
                                title: "Unrivaled Privacy",
                                desc: "We specialize in finding the world's most secluded enclaves, where your peace is paramount."
                            },
                            {
                                icon: <Heart className="w-10 h-10" />,
                                title: "Island Soul",
                                desc: "Our connections with local island communities bring an authentic depth to every journey."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-12 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-brand-orange/20 text-brand-orange mb-8 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/Contact CTA */}
            <section className="py-40 text-center">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-6xl md:text-8xl font-serif font-bold text-brand-dark mb-12">
                            Ready to Write <br />
                            <span className="text-brand-orange italic font-light">Your Chapter?</span>
                        </h2>
                        <button className="px-12 py-6 bg-brand-dark text-white rounded-full font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-orange transition-all shadow-2xl hover:shadow-brand-orange/40 flex items-center gap-4 mx-auto group">
                            Begin Your Journey
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
