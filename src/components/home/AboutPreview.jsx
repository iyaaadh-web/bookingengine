import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutPreview = () => {
    return (
        <section className="py-20 bg-orange-950 text-white relative overflow-hidden">
            {/* Subtle warm gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/60 via-orange-950 to-amber-950/50 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="order-2 md:order-1">
                        <span className="text-orange-200 font-serif italic text-xl mb-4 block">
                            Our Story
                        </span>
                       <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight text-white !text-white">
                     Curating Paradise Since 2024
                       </h2>
                        <div className="space-y-6 text-lg text-white-100 font-serif leading-relaxed">
                            <p>
                                Fasmala Travels was born from a deep love for the Maldives and a desire to share its hidden gems with the world. We are a team of local experts and luxury travel enthusiasts dedicated to crafting bespoke journeys that go beyond the ordinary.
                            </p>
                            <p>
                                Whether you seek the thrill of diving with manta rays, the serenity of a private sandbank, or the indulgence of a world-class spa, we know the perfect island for you.
                            </p>
                        </div>
                    </div>

                    {/* Right: Background Image */}
                    <div className="order-1 md:order-2">
                        <div 
                            className="w-full h-96 md:h-full min-h-96 bg-cover bg-center rounded-2xl shadow-2xl"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
