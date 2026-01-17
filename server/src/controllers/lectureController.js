const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const { checkInstructorAvailability, checkTimeConflict } = require('../utils/scheduleValidator');

// Add a lecture (batch) to a course
const addLecture = async (req, res) => {
  try {
    const { title, batchNumber, courseId, instructorId, date, startTime, endTime } = req.body;

    // Validate input
    if (!title || !batchNumber || !courseId || !instructorId || !date || !startTime || !endTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check instructor availability - no other lecture on the same date
    const isAvailable = await checkInstructorAvailability(instructorId, new Date(date));
    if (!isAvailable) {
      return res.status(409).json({
        message: 'Instructor already has a lecture scheduled on this date. Cannot assign another lecture.',
      });
    }

    // Create lecture
    const lecture = new Lecture({
      title,
      batchNumber,
      courseId,
      instructor: instructorId,
      date: new Date(date),
      startTime,
      endTime,
    });

    await lecture.save();
    await lecture.populate(['courseId', 'instructor']);

    res.status(201).json({ message: 'Lecture added successfully', lecture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lectures
const getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate('courseId', 'name level')
      .populate('instructor', 'name email')
      .sort({ date: 1 });
    
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lectures by course ID
const getLecturesByCourse = async (req, res) => {
  try {
    const lectures = await Lecture.find({ courseId: req.params.courseId })
      .populate('courseId', 'name level')
      .populate('instructor', 'name email')
      .sort({ date: 1, startTime: 1 });
    
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lectures assigned to an instructor
const getLecturesByInstructor = async (req, res) => {
  try {
    const instructorId = req.user.id;
    
    const lectures = await Lecture.find({ instructor: instructorId })
      .populate('courseId', 'name level description image')
      .populate('instructor', 'name email')
      .sort({ date: 1, startTime: 1 });
    
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update lecture
const updateLecture = async (req, res) => {
  try {
    const { title, batchNumber, instructorId, date, startTime, endTime } = req.body;
    const lectureId = req.params.id;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    // If instructor is being changed, check availability
    if (instructorId && instructorId !== lecture.instructor.toString()) {
      const isAvailable = await checkInstructorAvailability(
        instructorId,
        new Date(date || lecture.date),
        lectureId
      );
      if (!isAvailable) {
        return res.status(409).json({
          message: 'Instructor is not available on this date',
        });
      }
    }

    // If date is being changed, check availability
    if (date && new Date(date).toDateString() !== lecture.date.toDateString()) {
      const isAvailable = await checkInstructorAvailability(
        instructorId || lecture.instructor,
        new Date(date),
        lectureId
      );
      if (!isAvailable) {
        return res.status(409).json({
          message: 'Instructor already has a lecture scheduled on this date',
        });
      }
    }

    lecture.title = title || lecture.title;
    lecture.batchNumber = batchNumber || lecture.batchNumber;
    lecture.instructor = instructorId || lecture.instructor;
    lecture.date = date ? new Date(date) : lecture.date;
    lecture.startTime = startTime || lecture.startTime;
    lecture.endTime = endTime || lecture.endTime;

    await lecture.save();
    await lecture.populate(['courseId', 'instructor']);

    res.status(200).json({ message: 'Lecture updated successfully', lecture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete lecture
const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check instructor availability on a date
const checkAvailability = async (req, res) => {
  try {
    const { instructorId, date } = req.query;

    if (!instructorId || !date) {
      return res.status(400).json({ message: 'Instructor ID and date are required' });
    }

    const isAvailable = await checkInstructorAvailability(instructorId, new Date(date));

    res.status(200).json({
      available: isAvailable,
      message: isAvailable
        ? 'Instructor is available'
        : 'Instructor already has a lecture on this date',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addLecture,
  getAllLectures,
  getLecturesByCourse,
  getLecturesByInstructor,
  updateLecture,
  deleteLecture,
  checkAvailability,
};
