import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Destinations = () => {
    const [selectedAtoll, setSelectedAtoll] = useState(null);

    const atolls = [
        { name: "North Male Atoll", description: "Home to the capital and luxury resorts", x: "50%", y: "35%" },
        { name: "South Male Atoll", description: "Famous for diving and currents", x: "48%", y: "45%" },
        { name: "Baa Atoll", description: "UNESCO Biosphere Reserve", x: "35%", y: "25%" },
        { name: "Ari Atoll", description: "Whale shark spotting haven", x: "40%", y: "50%" },
        { name: "Lhaviyani Atoll", description: "Pristine diving sites", x: "45%", y: "20%" },
        { name: "Addu Atoll", description: "Southernmost atoll", x: "52%", y: "80%" },
    ];

    return (
        <section className="py-20 bg-brand-dark text-white overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                {/* Content */}
                <div className="w-full md:w-1/3">
                    <h2 className="text-4xl font-serif font-bold mb-6">Explore the Atolls</h2>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                        The Maldives consists of 26 atolls, each offering a unique slice of paradise. From the vibrant marine life of Baa Atoll to the surf breaks of North Male, discover your perfect island.
                    </p>
                    <div className="space-y-4">
                        {atolls.map((atoll, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer group ${selectedAtoll === atoll.name ? 'bg-brand-orange/20' : 'hover:bg-white/10'
                                    }`}
                                onMouseEnter={() => setSelectedAtoll(atoll.name)}
                                onMouseLeave={() => setSelectedAtoll(null)}
                            >
                                <MapPin className="text-brand-orange group-hover:scale-110 transition-transform" />
                                <div>
                                    <h4 className="font-semibold text-white">{atoll.name}</h4>
                                    <p className="text-sm text-gray-400">{atoll.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Interactive Map */}
                <div className="w-full md:w-2/3 h-[500px] bg-gradient-to-br from-blue-900/30 to-blue-950/50 rounded-2xl relative overflow-hidden border border-brand-orange/30 shadow-2xl">
                    {/* Maldives Map Background */}
                    <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
                            {/* Ocean background */}
                            <rect width="400" height="600" fill="#1e3a5f" />

                            {/* Maldives archipelago outline - simplified representation */}
                            <g opacity="0.3" fill="#4a90e2" stroke="#6bb6ff" strokeWidth="0.5">
                                {/* Northern atolls */}
                                <ellipse cx="200" cy="100" rx="15" ry="20" />
                                <ellipse cx="180" cy="130" rx="18" ry="22" />
                                <ellipse cx="210" cy="140" rx="16" ry="19" />

                                {/* Central atolls */}
                                <ellipse cx="190" cy="180" rx="20" ry="25" />
                                <ellipse cx="220" cy="190" rx="17" ry="21" />
                                <ellipse cx="175" cy="220" rx="19" ry="23" />
                                <ellipse cx="205" cy="235" rx="21" ry="26" />

                                {/* Male atolls */}
                                <ellipse cx="200" cy="280" rx="22" ry="27" />
                                <ellipse cx="195" cy="320" rx="20" ry="24" />

                                {/* Southern atolls */}
                                <ellipse cx="210" cy="370" rx="18" ry="22" />
                                <ellipse cx="200" cy="410" rx="19" ry="23" />
                                <ellipse cx="205" cy="450" rx="17" ry="21" />
                                <ellipse cx="208" cy="490" rx="16" ry="20" />
                            </g>
                        </svg>
                    </div>

                    {/* Atoll markers */}
                    {atolls.map((atoll, index) => (
                        <motion.div
                            key={index}
                            className="absolute"
                            style={{ left: atoll.x, top: atoll.y, transform: 'translate(-50%, -50%)' }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.15, type: 'spring' }}
                            onMouseEnter={() => setSelectedAtoll(atoll.name)}
                            onMouseLeave={() => setSelectedAtoll(null)}
                        >
                            {/* Marker dot */}
                            <div className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${selectedAtoll === atoll.name
                                    ? 'bg-brand-orange scale-150 shadow-lg shadow-brand-orange/50'
                                    : 'bg-white/80 hover:bg-brand-orange hover:scale-125'
                                }`} />

                            {/* Atoll label */}
                            <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${selectedAtoll === atoll.name ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                                }`}>
                                <div className="bg-brand-dark/95 backdrop-blur-sm px-4 py-2 rounded-lg border border-brand-orange/30 shadow-xl">
                                    <p className="text-sm font-semibold text-white">{atoll.name}</p>
                                    <p className="text-xs text-gray-400">{atoll.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 text-brand-orange/40 font-serif text-sm">
                        Maldives Atolls
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Destinations;
