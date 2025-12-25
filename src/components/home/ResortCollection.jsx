import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResortCollection = () => {
    const resorts = [
        {
            name: "Velaa Private Island",
            location: "Noonu Atoll",
            image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
            rating: 5.0
        },
        {
            name: "Soneva Jani",
            location: "Noonu Atoll",
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
            rating: 5.0
        },
        {
            name: "Cheval Blanc Randheli",
            location: "Noonu Atoll",
            image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1974&auto=format&fit=crop",
            rating: 5.0
        }
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-brand-orange mb-6"
                        >
                            <span className="w-12 h-px bg-brand-orange"></span>
                            <span className="uppercase tracking-[0.3em] text-xs font-black">Maldives Premier Collection</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-6xl font-serif font-bold text-brand-dark leading-[1.1]"
                        >
                            Exceptional <br />
                            <span className="text-brand-orange italic font-light">Sanctuaries.</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link to="/collection" className="group flex items-center gap-3 text-brand-dark font-black uppercase tracking-widest text-sm hover:text-brand-orange transition-colors">
                            View Full Collection
                            <span className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
                                <ArrowUpRight size={20} />
                            </span>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {resorts.map((resort, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-8 shadow-2xl">
                                <img
                                    src={resort.image}
                                    alt={resort.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-6 right-6">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
                                        <Star size={12} className="text-brand-orange fill-brand-orange" />
                                        <span className="text-[10px] font-black tracking-widest text-brand-dark">{resort.rating}</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-10 left-10 right-10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                                    <button className="w-full py-4 bg-white text-brand-dark rounded-xl font-black uppercase tracking-widest text-xs hover:bg-brand-orange hover:text-white transition-colors">
                                        Exploration Details
                                    </button>
                                </div>
                            </div>

                            <div className="px-2">
                                <div className="flex items-center gap-2 text-brand-orange mb-3">
                                    <MapPin size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">{resort.location}</span>
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-brand-dark group-hover:text-brand-orange transition-colors leading-tight">
                                    {resort.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>
        </section>
    );
};

export default ResortCollection;
