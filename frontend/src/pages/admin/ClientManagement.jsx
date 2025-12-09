import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { getClients, createClient, updateClient, deleteClient } from '../../api/api';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [formData, setFormData] = useState({
    name:  '',
    description: '',
    designation: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      toast.error('Error fetching clients');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('designation', formData. designation);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editMode) {
        await updateClient(currentClient._id, data);
        toast.success('Client updated successfully');
      } else {
        await createClient(data);
        toast.success('Client created successfully');
      }
      resetForm();
      fetchClients();
    } catch (error) {
      toast.error(error.response?.data?. message || 'Error saving client');
    }
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setFormData({
      name: client.name,
      description: client.description,
      designation: client.designation,
      image: null
    });
    setImagePreview(`http://localhost:5000${client.image}`);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(id);
        toast.success('Client deleted successfully');
        fetchClients();
      } catch (error) {
        toast.error('Error deleting client');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', designation: '', image: null });
    setImagePreview(null);
    setShowModal(false);
    setEditMode(false);
    setCurrentClient(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-primary hover:text-indigo-700">
                <FaArrowLeft className="text-2xl" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
            >
              <FaPlus /> Add Client
            </button>
          </div>
        </div>
      </header>

      {/* Clients Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client) => (
            <div key={client._id} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img
                src={`http://localhost:5000${client.image}`}
                alt={client.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 mb-3 italic">"{client.description}"</p>
              <h3 className="text-lg font-bold text-primary mb-1">{client.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{client.designation}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-blue-600 transition"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(client._id)}
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-red-600 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No clients found. Add your first client!</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editMode ?  'Edit Client' : 'Add New Client'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Client Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Description/Testimonial</label>
                  <textarea
                    name="description"
                    value={formData. description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., CEO, Web Developer, Designer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Client Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editMode}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-full mx-auto" />
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
                  >
                    {editMode ? 'Update Client' : 'Create Client'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;