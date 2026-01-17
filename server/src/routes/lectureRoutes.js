const express = require('express');
const router = express.Router();
const {
  addLecture,
  getAllLectures,
  getLecturesByCourse,
  getLecturesByInstructor,
  updateLecture,
  deleteLecture,
  checkAvailability,
} = require('../controllers/lectureController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Lecture routes
router.post('/', authMiddleware, adminMiddleware, addLecture);
router.get('/', authMiddleware, getAllLectures);
router.get('/course/:courseId', authMiddleware, getLecturesByCourse);
router.get('/instructor/my-lectures', authMiddleware, getLecturesByInstructor);
router.get('/availability/check', authMiddleware, adminMiddleware, checkAvailability);
router.put('/:id', authMiddleware, adminMiddleware, updateLecture);
router.delete('/:id', authMiddleware, adminMiddleware, deleteLecture);

module.exports = router;
