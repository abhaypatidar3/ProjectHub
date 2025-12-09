import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaProjectDiagram, FaUsers, FaEnvelope, FaNewspaper } from 'react-icons/fa';
import { getAdminStats } from '../../api/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalClients: 0,
    totalContacts:  0,
    totalSubscribers: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getAdminStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const cards = [
    {
      title: 'Projects',
      count: stats.totalProjects,
      icon: <FaProjectDiagram className="text-4xl" />,
      link: '/admin/projects',
      color: 'bg-blue-500'
    },
    {
      title: 'Clients',
      count: stats.totalClients,
      icon: <FaUsers className="text-4xl" />,
      link: '/admin/clients',
      color: 'bg-green-500'
    },
    {
      title:  'Contact Forms',
      count: stats.totalContacts,
      icon: <FaEnvelope className="text-4xl" />,
      link: '/admin/contacts',
      color: 'bg-purple-500'
    },
    {
      title: 'Newsletter Subscribers',
      count: stats. totalSubscribers,
      icon: <FaNewspaper className="text-4xl" />,
      link: '/admin/newsletter',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link 
            to="/" 
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Site
          </Link>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className={`${card.color} text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>{card.icon}</div>
                <div className="text-4xl font-bold">{card. count}</div>
              </div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/projects"
              className="border-2 border-primary text-primary px-6 py-3 rounded-lg text-center font-semibold hover:bg-primary hover:text-white transition"
            >
              Manage Projects
            </Link>
            <Link
              to="/admin/clients"
              className="border-2 border-green-500 text-green-500 px-6 py-3 rounded-lg text-center font-semibold hover:bg-green-500 hover:text-white transition"
            >
              Manage Clients
            </Link>
            <Link
              to="/admin/contacts"
              className="border-2 border-purple-500 text-purple-500 px-6 py-3 rounded-lg text-center font-semibold hover:bg-purple-500 hover:text-white transition"
            >
              View Contact Forms
            </Link>
            <Link
              to="/admin/newsletter"
              className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg text-center font-semibold hover:bg-orange-500 hover:text-white transition"
            >
              View Subscribers
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;