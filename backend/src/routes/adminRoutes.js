const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');

// Admin dashboard stats (protected)
router.get('/stats', auth, isAdmin, async (req, res) => {
  try {
    const Project = require('../models/Project');
    const Client = require('../models/Client');
    const Contact = require('../models/Contact');
    const Newsletter = require('../models/Newsletter');

    const stats = {
      totalProjects:  await Project.countDocuments(),
      totalClients: await Client. countDocuments(),
      totalContacts: await Contact.countDocuments(),
      totalSubscribers: await Newsletter.countDocuments()
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;