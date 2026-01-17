const Lecture = require('../models/Lecture');

// Check if instructor is available on a specific date
const checkInstructorAvailability = async (instructorId, date, excludeLectureId = null) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    let query = {
      instructor: instructorId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    };

    if (excludeLectureId) {
      query._id = { $ne: excludeLectureId };
    }

    const existingLecture = await Lecture.findOne(query);
    return !existingLecture; // Returns true if available, false if not
  } catch (error) {
    throw error;
  }
};

// Check for time conflicts on the same day
const checkTimeConflict = async (instructorId, date, startTime, endTime, excludeLectureId = null) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    let query = {
      instructor: instructorId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    };

    if (excludeLectureId) {
      query._id = { $ne: excludeLectureId };
    }

    const conflictingLecture = await Lecture.findOne(query);
    
    if (!conflictingLecture) {
      return false; // No conflict
    }

    // Check if times overlap
    const existingStart = conflictingLecture.startTime;
    const existingEnd = conflictingLecture.endTime;

    const newStart = startTime;
    const newEnd = endTime;

    // Times overlap if: newStart < existingEnd AND newEnd > existingStart
    const overlap = newStart < existingEnd && newEnd > existingStart;
    
    return overlap;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkInstructorAvailability,
  checkTimeConflict,
};
