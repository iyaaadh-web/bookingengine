import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah & James",
            location: "London, UK",
            image: "https://images.unsplash.com/photo-1519671482538-518b5c2bf1c6?q=80&w=1972&auto=format&fit=crop",
            quote: "Fasmala curated the most magical honeymoon we could have imagined. Every detail was perfect, from the private sunset cruise to the underwater restaurant reservation."
        },
        {
            name: "The Chen Family",
            location: "Singapore",
            image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=2054&auto=format&fit=crop",
            quote: "Traveling with kids can be stressful, but Fasmala found us the perfect family-friendly resort with amazing activities for the little ones. Highly recommended!"
        }
    ];

    return (
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-serif font-bold text-brand-dark text-center mb-16">Stories from Paradise</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
                        >
                            <Quote className="absolute top-8 right-8 text-brand-orange/20 w-16 h-16" />
                            <div className="flex items-center mb-6">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-brand-orange"
                                />
                                <div>
                                    <h4 className="font-serif font-bold text-lg text-brand-dark">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.location}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic leading-relaxed relative z-10">
                                "{item.quote}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
