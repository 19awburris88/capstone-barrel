const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

// Dummy admin user for testing
const dummyAdmin = {
  email: 'admin@barrelexchange.com',
  password: 'admin123',
  role: 'admin',
};

// ==========================
// @route POST /api/auth/register
// ==========================
router.post('/register', upload.single('profilePic'), async (req, res) => {
  const { firstName, lastName, bio, email, password } = req.body;
  const profilePic = req.file;

  if (!email || !password || !firstName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      bio,
      profilePic: profilePic ? `/uploads/${profilePic.filename}` : null,
    };

    console.log('🟢 New user registered:', newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// ==========================
// @route POST /api/auth/login
// ==========================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    // Simulate admin login
    if (email === dummyAdmin.email && password === dummyAdmin.password) {
      const token = jwt.sign(
        { email, role: dummyAdmin.role },
        process.env.JWT_SECRET || 'devsecret',
        { expiresIn: '2h' }
      );

      return res.json({
        message: 'Admin login successful',
        token,
        user: {
          id: 0,
          email: dummyAdmin.email,
          role: dummyAdmin.role,
          name: 'Admin User',
        },
      });
    }

    // Fallback for all other users (simulate a basic login)
    const token = jwt.sign(
      { email, role: 'user' },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: 1,
        email,
        role: 'user',
        name: 'Demo User',
      },
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
