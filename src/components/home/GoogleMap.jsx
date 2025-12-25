import React from 'react';

const GoogleMap = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Find Us in Paradise</h2>
                    <p className="text-gray-600 text-lg">Discover the Maldives - Your tropical escape awaits</p>
                </div>

                {/* Google Maps Embed */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4077888.128472736!2d70.67648799999999!3d3.2027837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x24b599bfaafb7bbd%3A0x414509e181956289!2sMaldives!5e0!3m2!1sen!2s!4v1733346000000!5m2!1sen!2s"
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Maldives Location"
                        className="w-full"
                    ></iframe>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <h3 className="text-xl font-serif font-bold text-brand-orange mb-2">Location</h3>
                        <p className="text-gray-600">Maldives, Indian Ocean</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-serif font-bold text-brand-orange mb-2">Email</h3>
                        <a href="mailto:sales@fasmala.com" className="text-gray-600 hover:text-brand-orange transition-colors">
                            sales@fasmala.com
                        </a>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-serif font-bold text-brand-orange mb-2">Time Zone</h3>
                        <p className="text-gray-600">GMT +5</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GoogleMap;
