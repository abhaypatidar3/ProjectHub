import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { subscribeNewsletter } from '../api/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await subscribeNewsletter(email);
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error(error. response?.data?.message || 'Error subscribing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Learn More Section with Background Image */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: 'url("public/images/subs2.png")',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Learn more about our listing process, as well as our
            <br />
            additional staging and design work. 
          </h2>

          <button className="bg-white text-gray-800 px-10 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            LEARN MORE
          </button>
        </div>
      </section>

      {/* Newsletter Subscribe Section */}
      <section className="bg-blue-600 py-5 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
            {/* Left side - Navigation links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-white text-sm">
              <a href="#home" className="hover:text-blue-200 transition font-medium">
                Home
              </a>
              <a href="#services" className="hover:text-blue-200 transition font-medium">
                Services
              </a>
              <a href="#projects" className="hover:text-blue-200 transition font-medium">
                Projects
              </a>
              <a href="#clients" className="hover: text-blue-200 transition font-medium">
                Testimonials
              </a>
              <a href="#contact" className="hover:text-blue-200 transition font-medium">
                Contact
              </a>
            </nav>

            {/* Right side - Subscribe form */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <span className="text-white font-semibold text-sm whitespace-nowrap">
                Subscribe Us
              </span>
              <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="px-4 py-2.5 rounded-md w-full sm:w-64 text-sm focus:outline-none focus: ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-blue-600 px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;