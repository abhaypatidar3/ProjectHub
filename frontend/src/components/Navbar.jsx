import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Smooth scroll to hero section
  const scrollToHero = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm: px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              ProjectHub
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <a href="#projects" className="text-gray-700 hover:text-primary transition">
              Projects
            </a>
            <a href="#clients" className="text-gray-700 hover:text-primary transition">
              Clients
            </a>
            <a 
              href="#hero" 
              onClick={scrollToHero}
              className="text-gray-700 hover:text-primary transition"
            >
              Contact
            </a>
            
            {user ?  (
              <>
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Admin Panel
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 flex items-center">
                    <FaUser className="mr-2" /> {user. name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;