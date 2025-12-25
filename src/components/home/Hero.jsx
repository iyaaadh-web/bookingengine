import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background Container */}
      <div className="absolute inset-0">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Background Video - using your local file */}
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg" // optional: add a fallback image in public/
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          
          {/* Optional: add a WebM version for better browser support & performance */}
          {/* <source src="/hero-video.webm" type="video/webm" /> */}
          
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Hero Text Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-5xl">
          Discover the Untouched Maldives
        </h1>
        <p className="text-white mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl font-light opacity-90">
          Curated journeys to the world's most breathtaking islands
        </p>
      </div>
    </section>
  );
};

export default Hero;
