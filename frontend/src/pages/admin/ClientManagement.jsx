import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaCrop } from 'react-icons/fa';
import { getClients, createClient, updateClient, deleteClient } from '../../api/api';
import ImageCropper from '../../components/ImageCropper';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    designation: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [croppedImageBase64, setCroppedImageBase64] = useState(null); // ✅ Store base64

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      toast.error('Error fetching clients');
      console.error('Fetch error:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target. files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (base64Image) => {
    console.log('✅ Received cropped image (base64), length:', base64Image.length);
    setCroppedImageBase64(base64Image); // ✅ Store base64
    setImagePreview(base64Image); // ✅ Use base64 directly for preview
    setShowCropper(false);
    toast.success('Image cropped to 450x350!');
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setOriginalImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!croppedImageBase64 && !editMode) {
      toast.error('Please upload and crop an image');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('designation', formData. designation);
    
    if (croppedImageBase64) {
      console.log('📤 Sending cropped image as base64');
      data.append('croppedImage', croppedImageBase64);
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
      console.error('Submit error:', error);
      toast.error(error.response?.data?.message || 'Error saving client');
    }
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setFormData({
      name: client.name,
      description: client.description,
      designation: client.designation || ''
    });
    setImagePreview(client.image); // ✅ Cloudinary URL
    setCroppedImageBase64(null);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window. confirm('Are you sure you want to delete this client?')) {
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
    setFormData({ name: '', description: '', designation:  '' });
    setImagePreview(null);
    setCroppedImageBase64(null);
    setOriginalImage(null);
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
              className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
            >
              <FaPlus /> Add Client
            </button>
          </div>
        </div>
      </header>

      {/* Clients Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={client.image} // ✅ Cloudinary URL
                alt={client.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/450x350?text=No+Image';
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{client.name}</h3>
                {client.designation && (
                  <p className="text-sm text-gray-500 mb-2">{client.designation}</p>
                )}
                <p className="text-gray-600 mb-4">{client.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(client)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No clients found.  Add your first client! </p>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editMode ? 'Edit Client' : 'Add New Client'}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter client name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter designation/title"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Testimonial</label>
                  <textarea
                    name="description"
                    value={formData. description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus: ring-primary focus:border-transparent"
                    placeholder="Enter client testimonial"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Client Image {! editMode && <span className="text-red-500">*</span>}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <FaCrop className="mx-auto text-4xl text-gray-400 mb-2" />
                      <p className="text-gray-600">Click to upload and crop image</p>
                      <p className="text-sm text-gray-500 mt-1">Will be cropped to 450x350 pixels</p>
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        {croppedImageBase64 ? 'Cropped Preview (450x350):' : 'Current Image:'}
                      </p>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full max-w-md mx-auto rounded-lg border-2 border-green-500"
                        style={{ width: '450px', height: '350px', objectFit: 'cover' }}
                      />
                      {croppedImageBase64 && (
                        <button
                          type="button"
                          onClick={() => {
                            setCroppedImageBase64(null);
                            setImagePreview(null);
                            toast.info('Image removed.  Upload a new one.');
                          }}
                          className="mt-2 text-sm text-red-600 hover:underline"
                        >
                          Remove and upload new image
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                  >
                    {editMode ?  'Update Client' : 'Create Client'}
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

      {/* Image Cropper Modal */}
      {showCropper && (
        <ImageCropper
          imageSrc={originalImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
};

export default ClientManagement;