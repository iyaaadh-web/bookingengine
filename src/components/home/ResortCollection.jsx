import React from 'react';
import { motion } from 'framer-motion';

const ResortCollection = () => {
    const resorts = [
        {
            name: "Soneva Jani",
            atoll: "Noonu Atoll",
            description: "Overwater villas with slides into the lagoon",
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop", // Slide/Water villa vibe
            stars: 5
        },
        {
            name: "Gili Lankanfushi",
            atoll: "North Male Atoll",
            description: "Eco-luxury overwater bungalows",
            image: "https://images.unsplash.com/photo-1439066615861-d1fbced6530e?q=80&w=2070&auto=format&fit=crop", // Rustic luxury
            stars: 5
        },
        {
            name: "Baros Maldives",
            atoll: "North Male Atoll",
            description: "Intimate island with pristine beaches",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop", // Classic Maldives
            stars: 5
        },
        {
            name: "Anantara Kihavah",
            atoll: "Baa Atoll",
            description: "UNESCO Biosphere Reserve luxury",
            image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c78?q=80&w=2069&auto=format&fit=crop", // Underwater/Blue
            stars: 5
        },
        {
            name: "Conrad Maldives",
            atoll: "South Ari Atoll",
            description: "Twin-island paradise resort",
            image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2088&auto=format&fit=crop", // Aerial view
            stars: 5
        },
        {
            name: "Velaa Private Island",
            atoll: "Noonu Atoll",
            description: "Ultra-luxury private island experience",
            image: "https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop", // Modern luxury
            stars: 5
        },
        {
            name: "Four Seasons Landaa Giraavaru",
            atoll: "Baa Atoll",
            description: "Wellness and marine discovery",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", // Blue/White
            stars: 5
        },
        {
            name: "One&Only Reethi Rah",
            atoll: "North Male Atoll",
            description: "Exclusive island sanctuary",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop", // Beach/Pool
            stars: 5
        },
        {
            name: "Cheval Blanc Randheli",
            atoll: "Noonu Atoll",
            description: "French elegance meets Maldivian beauty",
            image: "https://images.unsplash.com/photo-1560252019-357f8854650d?q=80&w=2070&auto=format&fit=crop", // Elegant design
            stars: 5
        },
        {
            name: "Waldorf Astoria Maldives",
            atoll: "South Male Atoll",
            description: "Contemporary luxury and sophistication",
            image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1975&auto=format&fit=crop", // Modern
            stars: 5
        },
        {
            name: "The St. Regis Maldives",
            atoll: "Vommuli Island",
            description: "Exquisite beachfront villas",
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop", // Architecture
            stars: 5
        },
        {
            name: "Six Senses Laamu",
            atoll: "Laamu Atoll",
            description: "Sustainable luxury in untouched nature",
            image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2021&auto=format&fit=crop", // Wooden/Nature
            stars: 5
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brand-dark mb-4">Our Resort Collection</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Handpicked luxury resorts across the Maldives' most stunning atolls
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resorts.map((resort, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <img
                                    src={resort.image}
                                    alt={resort.name}
                                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <div className="flex items-center mb-3">
                                        {[...Array(resort.stars)].map((_, i) => (
                                            <span key={i} className="text-brand-orange text-sm drop-shadow-md">★</span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold mb-2 text-brand-orange drop-shadow-lg">{resort.name}</h3>
                                    <p className="text-sm text-gray-200 mb-2 font-medium drop-shadow-md">{resort.atoll}</p>
                                    <p className="text-sm text-gray-100 drop-shadow-md">{resort.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResortCollection;
