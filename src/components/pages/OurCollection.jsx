import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

const OurCollection = () => {
    const resorts = [
        {
            name: "Velaa Private Island",
            location: "Noonu Atoll",
            image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
            price: "From $2,500/night",
            rating: 5
        },
        {
            name: "Soneva Jani",
            location: "Noonu Atoll",
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
            price: "From $3,200/night",
            rating: 5
        },
        {
            name: "Cheval Blanc Randheli",
            location: "Noonu Atoll",
            image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1974&auto=format&fit=crop",
            price: "From $2,800/night",
            rating: 5
        },
        {
            name: "One&Only Reethi Rah",
            location: "North Male Atoll",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
            price: "From $1,900/night",
            rating: 5
        },
        {
            name: "Gili Lankanfushi",
            location: "North Male Atoll",
            image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1976&auto=format&fit=crop",
            price: "From $1,500/night",
            rating: 5
        },
        {
            name: "Joali Maldives",
            location: "Raa Atoll",
            image: "https://images.unsplash.com/photo-1589979481223-deb893043163?q=80&w=1987&auto=format&fit=crop",
            price: "From $2,200/night",
            rating: 5
        }
    ];

    return (
        <div className="pt-24 pb-20 bg-brand-light min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-bold text-brand-dark mb-4">Our Collection</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Handpicked resorts offering the pinnacle of luxury, privacy, and Maldivian hospitality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {resorts.map((resort, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={resort.image}
                                    alt={resort.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-brand-orange font-bold text-sm">
                                    <Star size={14} className="fill-current mr-1" /> {resort.rating}.0
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">{resort.location}</p>
                                <h3 className="text-xl font-serif font-bold text-brand-dark mb-3 group-hover:text-brand-orange transition-colors">
                                    {resort.name}
                                </h3>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-brand-dark font-medium">{resort.price}</span>
                                    <button className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-dark group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurCollection;
