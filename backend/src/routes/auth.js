const express = require('express');
const router = express.Router();

// Simple auth for demo purposes
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // In a real app, you would validate credentials against a database
  if (email && password) {
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: '1',
        email: email,
        name: 'Demo User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      token: 'demo-jwt-token'
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Email and password required',
      error: 'INVALID_CREDENTIALS'
    });
  }
});

router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (email && password && name) {
    res.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: '1',
        email: email,
        name: name,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      token: 'demo-jwt-token'
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Email, password, and name required',
      error: 'MISSING_FIELDS'
    });
  }
});

router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;