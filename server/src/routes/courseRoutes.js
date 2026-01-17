const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Course routes - protected with admin middleware
router.post('/', authMiddleware, adminMiddleware, createCourse);
router.get('/', authMiddleware, getAllCourses);
router.get('/:id', authMiddleware, getCourseById);
router.put('/:id', authMiddleware, adminMiddleware, updateCourse);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCourse);

module.exports = router;
