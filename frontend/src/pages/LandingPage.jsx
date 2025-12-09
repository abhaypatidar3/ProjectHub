import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Hero from '../components/Hero';
import NotAverageSection from '../components/NotAverageSection';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutUs from '../components/AboutUs';
import { getProjects, getClients } from '../api/api';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Contact Form */}
      <Hero />

      {/* NEW SECTIONS */}
      <NotAverageSection />
      <WhyChooseUs />
      <AboutUs />

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
            <p className="text-xl text-gray-600">
              Check out some of our amazing work
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project._id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img 
                  src={`http://localhost:5000${project.image}`} 
                  alt={project.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.name}
                  </h3>
                  {project.location && (
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-primary" />
                      {project. location}
                    </p>
                  )}
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Clients Section */}
      <section id="clients" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Happy Clients</h2>
            <p className="text-xl text-gray-600">
              See what our clients say about us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {clients.map((client) => (
              <div 
                key={client._id} 
                className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition"
              >
                <img 
                  src={`http://localhost:5000${client.image}`} 
                  alt={client.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-gray-600 mb-4 italic">
                  "{client.description}"
                </p>
                <h4 className="font-bold text-primary text-lg">
                  {client.name}
                </h4>
                <p className="text-gray-500 text-sm">
                  {client.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      <Footer />
    </div>
  );
};

export default LandingPage;