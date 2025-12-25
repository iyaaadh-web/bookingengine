import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="pt-28 pb-20 bg-white min-h-screen">
            {/* Hero Section */}
            <div className="container mx-auto px-6 lg:px-12 mb-24">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <span className="text-brand-orange font-serif italic text-2xl mb-6 block">About Fasmala</span>
                        <h1 className="text-5xl lg:text-6xl font-serif font-bold text-brand-dark mb-8 leading-tight">
                            Crafting Timeless <br /> Maldivian Memories
                        </h1>
                        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                            Fasmala Travels is more than just a travel agency; we are your personal gateway to the Maldives. Founded by a team of locals with a deep passion for our island nation, we specialize in curating bespoke experiences that go beyond the brochure.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            We believe that luxury is personal. Whether it's a private sandbank dinner under the stars, a family adventure in the deep blue, or a wellness retreat to rejuvenate your soul, we handle every detail with care and precision.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1578922746465-3a80a228f28f?q=80&w=1974&auto=format&fit=crop"
                                alt="Maldives aerial"
                                className="rounded-2xl shadow-2xl z-10 relative"
                            />
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-orange/10 rounded-full -z-0 hidden md:block" />
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-dark/5 rounded-full -z-0 hidden md:block" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Values */}
            <div className="bg-brand-light py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold text-brand-dark">Our Promise to You</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: "Local Expertise", desc: "Born and raised in the Maldives, we know the secrets that others don't." },
                            { title: "Personalized Service", desc: "No two travelers are alike. We tailor every itinerary to your unique desires." },
                            { title: "Sustainable Travel", desc: "We are committed to preserving the beauty of our islands for generations to come." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-8 rounded-xl shadow-sm text-center"
                            >
                                <h3 className="text-xl font-serif font-bold text-brand-orange mb-4">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
