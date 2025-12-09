import React from 'react';
import { FaHome, FaPencilRuler, FaBullhorn, FaArrowRight } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaHome className="text-4xl text-blue-500" />,
      title: 'Potential ROI',
      description: 'We deploy the latest design trends and best practices to maximize your investment returns and deliver measurable results for your business growth.'
    },
    {
      icon: <FaPencilRuler className="text-4xl text-blue-500" />,
      title: 'Design',
      description: 'Our design team creates stunning, user-centric digital experiences that not only look great but also drive engagement and conversions for your brand.'
    },
    {
      icon: <FaBullhorn className="text-4xl text-blue-500" />,
      title: 'Marketing',
      description: 'Strategic and creative marketing solutions that elevate your brand, reach your target audience, and generate qualified leads to fuel your business.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-20 h-20 bg-blue-500 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gray-200 rounded-full opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg: px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Choose Us? 
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Arrow indicator */}
        <div className="flex justify-end mt-8">
          <FaArrowRight className="text-3xl text-orange-500 animate-bounce-horizontal hover:scale-125 duration-200" />
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        . animate-bounce-horizontal {
          animation: bounce-horizontal 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;