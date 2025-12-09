const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next(); // IMPORTANT: Call next() to continue to next middleware
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next(); // IMPORTANT: Call next() to continue
    } else {
      res. status(403).json({ message: 'Access denied.  Admin only.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { auth, isAdmin };