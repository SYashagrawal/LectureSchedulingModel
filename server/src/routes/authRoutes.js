const express = require('express');
const router = express.Router();
const { register, login, getAllInstructors, getProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

// Instructors
router.get('/instructors', authMiddleware, getAllInstructors);

module.exports = router;
