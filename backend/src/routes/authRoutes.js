const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { registerValidation, loginValidation, validate } = require('../middleware/validators');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register new user - WITH VALIDATION
router.post('/register', registerValidation, validate, async (req, res) => {
  try {
    const { name, email, password } = req. body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: 'user' // Default role
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user - WITH VALIDATION
router.post('/login', loginValidation, validate, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user
router. get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req. user._id,
        name: req. user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create admin (protected route - only for initial setup)
router.post('/create-admin', async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // Check admin secret (for security)
    if (adminSecret !== process. env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Invalid admin secret' });
    }

    // Check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create admin user
    const user = new User({
      name,
      email,
      password,
      role: 'admin'
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Admin created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;