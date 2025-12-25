import React from 'react';
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import HolidayTypes from '../components/home/HolidayTypes';
import ResortCollection from '../components/home/ResortCollection';
import SustainableTravel from '../components/home/SustainableTravel';
import ContactBooking from '../components/home/ContactBooking';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <AboutPreview />
            <HolidayTypes />
            <ResortCollection />
            <SustainableTravel />
            <ContactBooking />
        </div>
    );
};

export default HomePage;
