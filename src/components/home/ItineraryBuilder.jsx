import React, { useState } from 'react';

import { Check, ArrowRight } from 'lucide-react';

const ItineraryBuilder = () => {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        { id: 1, label: "Preferences" },
        { id: 2, label: "Destinations" },
        { id: 3, label: "Activities" },
        { id: 4, label: "Review" },
    ];

    return (
        <section className="py-20 bg-brand-dark text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500930248211-50ed14170863?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-10" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl font-serif font-bold mb-6">Build Your Custom Itinerary</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Design your dream vacation with our AI-powered itinerary builder. Tell us what you love, and we'll craft a personalized journey just for you.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-lg">Share Your Vision</h4>
                                    <p className="text-sm text-gray-400">Select your interests, travel style, and budget.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-lg">Get Recommendations</h4>
                                    <p className="text-sm text-gray-400">Receive tailored suggestions for resorts and activities.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-lg">Refine & Book</h4>
                                    <p className="text-sm text-gray-400">Fine-tune your plan with our experts and secure your booking.</p>
                                </div>
                            </div>
                        </div>

                        <button className="mt-10 px-8 py-4 bg-brand-orange text-white font-bold tracking-wider hover:bg-white hover:text-brand-dark transition-colors shadow-lg">
                            START BUILDING
                        </button>
                    </div>

                    {/* Interactive Preview */}
                    <div className="w-full md:w-1/2 bg-white text-gray-800 rounded-xl p-8 shadow-2xl">
                        <div className="flex justify-between mb-8 border-b pb-4">
                            {steps.map((step) => (
                                <div key={step.id} className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${step.id <= activeStep ? 'bg-brand-dark text-white' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                        {step.id < activeStep ? <Check size={16} /> : step.id}
                                    </div>
                                    <span className={`text-xs ${step.id <= activeStep ? 'text-brand-dark font-semibold' : 'text-gray-400'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-600">Travel Style</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Relaxation', 'Adventure', 'Culture', 'Luxury'].map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-brand-dark hover:text-white cursor-pointer transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-600">Duration</label>
                                <input type="range" className="w-full accent-brand-dark" />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>3 Days</span>
                                    <span>14+ Days</span>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    onClick={() => setActiveStep(prev => prev < 4 ? prev + 1 : 1)}
                                    className="flex items-center text-brand-dark font-bold hover:text-brand-orange transition-colors"
                                >
                                    Next Step <ArrowRight size={18} className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ItineraryBuilder;
