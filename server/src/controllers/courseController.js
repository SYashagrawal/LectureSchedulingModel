const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const { checkInstructorAvailability } = require('../utils/scheduleValidator');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;

    // Validate input
    if (!name || !level || !description) {
      return res.status(400).json({ message: 'Name, level, and description are required' });
    }

    const course = new Course({
      name,
      level,
      description,
      image: image || 'https://via.placeholder.com/300x200?text=Course+Image',
      createdBy: req.user.id,
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.name = name || course.name;
    course.level = level || course.level;
    course.description = description || course.description;
    course.image = image || course.image;

    await course.save();
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete all lectures associated with this course
    await Lecture.deleteMany({ courseId: req.params.id });

    res.status(200).json({ message: 'Course and its lectures deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
