import React from 'react';

const NotAverageSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden relative">
      {/* Decorative background circles */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-blue-500 rounded-full opacity-70"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-gray-100 rounded-full opacity-50"></div>
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-orange-400 rounded-full opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Not Your Average Realtor
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We distinguish ourselves by offering a comprehensive approach, 
              encompassing design, consultation, and marketing to give businesses 
              a competitive digital advantage.
            </p>
          </div>

          {/* Right Side - Image Grid */}
          <div className="relative">
            {/* Image Grid */}
            <div className="relative grid grid-cols-2 gap-4">
              {/* Large center image */}
              <div className="col-span-2 row-span-2">
                <div className="relative rounded-full overflow-hidden w-64 h-64 mx-auto border-8 border-gray-100 shadow-xl">
                  <img 
                    src="public/images/3.png" 
                    alt="Professional Realtor"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Top right circular image */}
              <div className="absolute -top-4 -right-4">
                <div className="rounded-full overflow-hidden w-40 h-40 border-4 border-white shadow-lg">
                 
                  <img 
                    src="public/images/2.png" 
                    alt="Happy Clients"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom right circular image */}
              <div className="absolute bottom-0 top-[150px] right-0">
                <div className="rounded-full overflow-hidden w-32 h-32 border-4 border-white shadow-lg">
                  <img 
                    src="public/images/1.png" 
                    alt="Professional Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotAverageSection;