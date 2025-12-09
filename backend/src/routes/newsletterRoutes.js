const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const { auth, isAdmin } = require('../middleware/auth');

// Get all newsletter subscriptions (admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const subscriptions = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error. message });
  }
});

// Subscribe to newsletter (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter',
      subscription 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete subscription (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const subscription = await Newsletter.findByIdAndDelete(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;