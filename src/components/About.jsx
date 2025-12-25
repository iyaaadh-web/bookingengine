import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-serif text-navy mb-8 relative inline-block">
                        About Us
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gold"></span>
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        Fasmala Travels is a premier luxury travel agency based in the Maldives, specializing in bespoke travel experiences. As a subsidiary of Fasmala Pvt Ltd, we partner with the finest resorts to offer world-class amenities, stunning surroundings, and exceptional service.
                    </p>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        Whether you're seeking a romantic getaway, an adventurous escape, or a serene retreat, our team ensures every detail is perfected for a truly memorable journey.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
