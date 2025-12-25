import React from 'react';
import { motion } from 'framer-motion';

const Experiences = () => {
    const experiences = [
        {
            title: "Wellness & Spa",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
            size: "col-span-1 md:col-span-2 row-span-2"
        },
        {
            title: "Underwater Adventure",
            image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop",
            size: "col-span-1 md:col-span-1 row-span-1"
        },
        {
            title: "Romantic Dining",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
            size: "col-span-1 md:col-span-1 row-span-1"
        },
        {
            title: "Water Sports",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
            size: "col-span-1 md:col-span-2 row-span-1"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Unforgettable Experiences</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Beyond the pristine beaches, discover a world of adventure, relaxation, and romance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative group overflow-hidden rounded-xl cursor-pointer ${exp.size}`}
                        >
                            <img
                                src={exp.image}
                                alt={exp.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <h3 className="text-2xl font-serif font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {exp.title}
                                </h3>
                                <div className="h-1 w-12 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
