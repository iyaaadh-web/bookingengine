import React from 'react';
import { Leaf, Heart, Globe } from 'lucide-react';

const SustainableTravel = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <span className="text-brand-orange font-serif italic text-xl mb-2 block">Travel with Purpose</span>
                <h2 className="text-4xl font-serif font-bold text-brand-dark mb-12">Sustainable Luxury</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6">
                            <Leaf size={32} />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Eco-Friendly Resorts</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We partner with resorts committed to renewable energy, plastic reduction, and marine conservation.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Marine Conservation</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Support coral restoration projects and protect the vibrant marine life that makes the Maldives unique.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-6">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Community Support</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Engage with local communities and contribute to the preservation of Maldivian culture and heritage.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SustainableTravel;
