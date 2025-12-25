import React from 'react';
import { motion } from 'framer-motion';

const HolidayTypes = () => {
    const types = [
        {
            title: "Family Holidays",
            image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop",
            description: "Memorable moments for everyone"
        },
        {
            title: "Honeymoon",
            image: "https://images.unsplash.com/photo-1515994026110-b9e43f35f524?q=80&w=2070&auto=format&fit=crop",
            description: "Romantic escapes in paradise"
        },
        {
            title: "Diving",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
            description: "Explore the vibrant underwater world"
        },
        {
            title: "Wellness",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
            description: "Rejuvenate mind, body, and soul"
        },
        {
            title: "Ultra Luxury",
            image: "https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop",
            description: "The pinnacle of exclusivity"
        },
        {
            title: "All Inclusive",
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
            description: "Carefree indulgence"
        }
    ];

    return (
        <section className="py-20 bg-offwhite">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brand-dark mb-4">Choose Your Holiday</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Tailored experiences for every traveler
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {types.map((type, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer relative overflow-hidden rounded-2xl h-80 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={type.image}
                                alt={type.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <h3 className="text-2xl font-serif font-bold mb-2">{type.title}</h3>
                                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    {type.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HolidayTypes;
