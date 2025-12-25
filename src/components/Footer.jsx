import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-navy-dark text-white py-8 border-t border-white/10">
            <div className="container mx-auto px-6 text-center">
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Fasmala Travels. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
