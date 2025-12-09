import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createContact } from '../api/api';

const Hero = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
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
      className="relative h-[85vh] flex items-center justify-center pt-20 pb-12"
      style={{
        // PUT YOUR BACKGROUND IMAGE PATH HERE
        backgroundImage: 'url("public/images/bg-image.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-white mt-[13vh]">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Consultation,
              <br />
              Design,
              <br />
              & Marketing
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Transform your business with our expert services
            </p>
          </div>

          {/* Right Side - Consultation Form */}
          <div className="flex justify-center lg:justify-end mt-[13vh]">
            <div 
              className="w-full max-w-md rounded-xl p-8 shadow-2xl"
              style={{
                background: 'rgba(51, 65, 107, 0.95)', // Semi-transparent blue
                backdropFilter: 'blur(10px)'
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
                Get a Free
                <br />
                Consultation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus: ring-2 focus:ring-white/50 focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
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
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
                  />
                </div>

                {/* City */}
                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Area, City"
                    className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus: ring-2 focus:ring-white/50 focus:border-transparent transition"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Get Quick Quote'}
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