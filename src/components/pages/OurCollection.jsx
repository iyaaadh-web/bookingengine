import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Search, Filter, MapPin, Wind, Umbrella, Map as MapIcon, ChevronRight } from 'lucide-react';

const OurCollection = () => {
    const [filter, setFilter] = useState('All');

    const resorts = [
        {
            id: 1,
            name: "Velaa Private Island",
            location: "Noonu Atoll",
            image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
            price: "$2,500",
            rating: 5.0,
            category: "Ultra-Luxury",
            description: "The ultimate island escape where every detail is tailored to your desires."
        },
        {
            id: 2,
            name: "Soneva Jani",
            location: "Noonu Atoll",
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
            price: "$3,200",
            rating: 5.0,
            category: "Sustainable",
            description: "Overwater villas with private slides and a commitment to barefoot luxury."
        },
        {
            id: 3,
            name: "Cheval Blanc Randheli",
            location: "Noonu Atoll",
            image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1974&auto=format&fit=crop",
            price: "$2,800",
            rating: 5.0,
            category: "Exclusive",
            description: "An elegant sanctuary designed by Jean-Michel Gathy for ultimate privacy."
        },
        {
            id: 4,
            name: "One&Only Reethi Rah",
            location: "North Male Atoll",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
            price: "$1,900",
            rating: 4.9,
            category: "Modern",
            description: "Sophisticated luxury spread across one of the largest islands in North Male."
        },
        {
            id: 5,
            name: "Gili Lankanfushi",
            location: "North Male Atoll",
            image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1976&auto=format&fit=crop",
            price: "$1,500",
            rating: 4.8,
            category: "Rustic",
            description: "The pioneer of rustic-chic luxury and Robinson Crusoe lifestyle."
        },
        {
            id: 6,
            name: "Joali Maldives",
            location: "Raa Atoll",
            image: "https://images.unsplash.com/photo-1589979481223-deb893043163?q=80&w=1987&auto=format&fit=crop",
            price: "$2,200",
            rating: 5.0,
            category: "Artistic",
            description: "An immersive art-focused resort celebrating sustainable glamour."
        }
    ];

    const categories = ['All', 'Ultra-Luxury', 'Sustainable', 'Exclusive', 'Modern', 'Artistic'];
    const filteredResorts = filter === 'All' ? resorts : resorts.filter(r => r.category === filter);

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2073&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-white"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-brand-orange mb-6"
                        >
                            <span className="w-12 h-px bg-brand-orange"></span>
                            <span className="uppercase tracking-[0.3em] text-xs font-black">Maldives Premier Collection</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-[0.9]"
                        >
                            Curated <br />
                            <span className="text-brand-orange italic font-light">Experiences.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-300 text-xl font-light leading-relaxed max-w-xl"
                        >
                            Discover our handpicked selection of the most extraordinary resorts in the archipelago, from private island refuges to architectural masterpieces.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === cat
                                            ? 'bg-brand-dark text-white shadow-lg'
                                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search resorts..."
                                    className="w-full md:w-64 pl-12 pr-6 py-2.5 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-brand-orange transition-all text-sm font-medium"
                                />
                            </div>
                            <button className="p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                                <Filter size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        <AnimatePresence mode="popLayout">
                            {filteredResorts.map((resort, index) => (
                                <motion.div
                                    layout
                                    key={resort.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 shadow-2xl">
                                        <img
                                            src={resort.image}
                                            alt={resort.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-brand-dark">
                                                {resort.category}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-10 left-10 right-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Star className="text-brand-orange fill-brand-orange" size={14} />
                                                <span className="text-white font-bold">{resort.rating}</span>
                                            </div>
                                            <p className="text-white/80 text-sm line-clamp-2 font-medium">
                                                {resort.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="px-2">
                                        <div className="flex items-center gap-2 text-brand-orange mb-3">
                                            <MapPin size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{resort.location}</span>
                                        </div>
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-3xl font-serif font-bold text-brand-dark group-hover:text-brand-orange transition-colors leading-none">
                                                {resort.name}
                                            </h3>
                                            <div className="text-right shrink-0">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nightly from</p>
                                                <p className="text-xl font-bold text-brand-dark">{resort.price}</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Wind size={16} />
                                                <span className="text-xs font-bold uppercase tracking-widest">Water Sports</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Umbrella size={16} />
                                                <span className="text-xs font-bold uppercase tracking-widest">Spa</span>
                                            </div>
                                            <div className="ml-auto">
                                                <ChevronRight className="text-brand-orange" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-32 p-16 rounded-[4rem] bg-gray-50 border border-gray-100 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <MapIcon size={200} />
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Didn't find what you're looking for?</h2>
                            <p className="text-gray-500 mb-10 text-lg">Our travel experts can help you find the perfect island sanctuary based on your specific requirements.</p>
                            <button className="px-12 py-5 bg-brand-orange text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-dark transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                                Consult a Specialist
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default OurCollection;
