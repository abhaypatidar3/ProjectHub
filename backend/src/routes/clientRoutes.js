const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const upload = require('../middleware/upload');
const processImage = require('../middleware/imageProcessor');
const { auth, isAdmin } = require('../middleware/auth');
const { getUploadUrl } = require('../utils/urlHelper');

// Get all clients (public)
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 }).lean();
    
    // Convert image paths to absolute URLs
    const clientsWithAbsoluteUrls = clients.map(client => ({
      ...client,
      image: getUploadUrl(client.image)
    }));
    
    res.json(clientsWithAbsoluteUrls);
  } catch (error) {
    res.status(500).json({ message: error. message });
  }
});

// Get single client (public)
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req. params.id).lean();
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Convert image path to absolute URL
    client.image = getUploadUrl(client.image);
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create client (admin only)
router.post('/', auth, isAdmin, upload.single('image'), processImage, async (req, res) => {
  try {
    const { name, description, designation } = req.body;

    if (! req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const client = new Client({
      name,
      description,
      designation,
      image: `/uploads/${req.file.filename}`
    });

    const newClient = await client.save();
    
    // Return with absolute URL
    const responseClient = newClient.toObject();
    responseClient.image = getUploadUrl(responseClient.image);
    
    res.status(201).json(responseClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update client (admin only)
router.put('/:id', auth, isAdmin, upload.single('image'), processImage, async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    const updateData = { name, description, designation };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).lean();

    if (!client) {
      return res. status(404).json({ message: 'Client not found' });
    }

    // Return with absolute URL
    client.image = getUploadUrl(client.image);
    
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: error. message });
  }
});

// Delete client (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const client = await Client. findByIdAndDelete(req. params.id);
    if (!client) {
      return res. status(404).json({ message: 'Client not found' });
    }
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;