import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-50 rounded-full opacity-50"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-gray-100 rounded-full opacity-40"></div>
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
       

        {/* Text Content */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            About Us
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Fifteen years of exceptional design, development, and marketing excellence. 
            As a customer-centric digital solutions company, we excel at brand-based work, 
            delivering tailored strategies that drive client success.  Our services include web 
            design, mobile app development, and social media management.  We're dedicated to 
            understanding your unique needs and providing results-driven solutions by combining 
            creativity and strategy.
          </p>

          <button className="inline-flex items-center px-8 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105">
            LEARN MORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;