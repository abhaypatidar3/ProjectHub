import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createContact } from '../api/api';

const Hero = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email:  '',
    mobileNumber: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createContact(formData);
      toast.success('Form submitted successfully!  We will contact you soon.');
      setFormData({ fullName: '', email: '', mobileNumber: '', city: '' });
    } catch (error) {
      toast.error(error.response?.data?. message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      className="relative h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("/images/bg-image.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 lg:bg-opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
          {/* Left Side - Text Content */}
          <div className="text-white text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 lg:mb-6 leading-tight">
              Consultation,
              <br />
              Design,
              <br />
              & Marketing
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-200 mb-4 lg:mb-8">
              Transform your business with our expert services
            </p>
          </div>

          {/* Right Side - Consultation Form */}
          <div className="flex justify-center lg:justify-end">
            <div 
              className="w-full max-w-md rounded-xl p-5 sm:p-6 lg:p-8 shadow-2xl"
              style={{
                background: 'rgba(51, 65, 107, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-4 sm:mb-5 lg:mb-6">
                Get a Free
                <br />
                Consultation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3 sm: space-y-3. 5 lg:space-y-4">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus: outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition text-sm sm:text-base"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData. email}
                    onChange={handleChange}
                    required
                    placeholder="Enter Email Address"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition text-sm sm:text-base"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    placeholder="Mobile Number"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus: outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition text-sm sm:text-base"
                  />
                </div>

                {/* City */}
                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData. city}
                    onChange={handleChange}
                    required
                    placeholder="Area, City"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition text-sm sm:text-base"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-2 sm:py-2.5 lg:py-3 px-6 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ?  'Submitting...' :  'Get Quick Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;