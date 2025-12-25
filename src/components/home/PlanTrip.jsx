import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Map, Star } from 'lucide-react';

const PlanTrip = () => {
    const steps = [
        {
            icon: <Map size={40} />,
            title: "Select Destination",
            description: "Choose from our curated list of exclusive islands and resorts."
        },
        {
            icon: <Calendar size={40} />,
            title: "Choose Dates",
            description: "Pick the perfect time for your tropical getaway."
        },
        {
            icon: <Users size={40} />,
            title: "Travelers",
            description: "Tell us who you're traveling with for tailored recommendations."
        },
        {
            icon: <Star size={40} />,
            title: "Preferences",
            description: "Customize your experience with activities and amenities."
        }
    ];

    return (
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Plan Your Dream Trip</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Crafting your perfect Maldives experience is just a few clicks away. Start your journey with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group cursor-pointer"
                        >
                            <div className="w-20 h-20 mx-auto bg-brand-light rounded-full flex items-center justify-center text-brand-dark mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 bg-brand-orange text-white font-medium hover:bg-brand-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                        Start Planning Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PlanTrip;
