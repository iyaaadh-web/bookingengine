import React from 'react';
import { motion } from 'framer-motion';

const destinations = [
    {
        name: 'Soneva Jani',
        image: 'https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2023/06/best-hotels-resorts-maldives.jpg?fit=1280%2C720&ssl=1',
    },
    {
        name: 'Cheval Blanc Randheli',
        image: 'https://i.ytimg.com/vi/JbcIyIx-h4g/maxresdefault.jpg',
    },
    {
        name: 'Velaa Private Island',
        image: 'https://b2241238.smushcdn.com/2241238/wp-content/gallery/maldives-best-hotels-2020/sunset-water-villa-with-pool-outdoor.jpg?lossy=2&strip=1&webp=1',
    },
    {
        name: 'One&Only Reethi Rah',
        image: 'https://thetravelexpert.ie/wp-content/uploads/2021/03/10.-Soneva-Jani.-1.jpg',
    },
];

const Destinations = () => {
    return (
        <section id="destinations" className="py-20 bg-offwhite">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-serif text-navy mb-4">Our Luxury Destinations</h2>
                    <p className="text-gray-500">Hand-picked resorts for the ultimate escape</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-sm shadow-lg cursor-pointer h-80"
                        >
                            <img
                                src={dest.image}
                                alt={dest.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-serif text-white font-bold">{dest.name}</h3>
                                <span className="text-gold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 block mt-2">
                                    Explore Resort
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
