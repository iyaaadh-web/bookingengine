import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Highlights = () => {
    const packages = [
        {
            title: "Luxury Overwater Villa",
            location: "Baa Atoll",
            price: "From $1,200/night",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
            tag: "Best Seller"
        },
        {
            title: "Family Beach Retreat",
            location: "North Male Atoll",
            price: "From $850/night",
            image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1974&auto=format&fit=crop",
            tag: "Family Friendly"
        },
        {
            title: "Romantic Sunset Cruise",
            location: "Ari Atoll",
            price: "From $450/person",
            image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1976&auto=format&fit=crop",
            tag: "Experience"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-serif font-bold text-brand-dark mb-2">Curated Highlights</h2>
                        <p className="text-gray-600">Exclusive packages and special offers just for you.</p>
                    </div>
                    <button className="hidden md:flex items-center text-brand-dark font-medium hover:text-brand-orange transition-colors">
                        View All Offers <ArrowRight size={20} className="ml-2" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                        >
                            <div className="relative h-96 w-full overflow-hidden">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                                    {pkg.tag}
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                <p className="text-sm font-light mb-1 text-gray-300">{pkg.location}</p>
                                <h3 className="text-2xl font-serif font-bold mb-2">{pkg.title}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-orange font-medium">{pkg.price}</span>
                                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                        <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <button className="flex items-center justify-center w-full text-brand-dark font-medium hover:text-brand-orange transition-colors">
                        View All Offers <ArrowRight size={20} className="ml-2" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Highlights;
