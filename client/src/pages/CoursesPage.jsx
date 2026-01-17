import { useEffect, useState } from 'react';
import { courseService, lectureService, authService } from '../services/api';
import './CoursesPage.css';

export const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddLecture, setShowAddLecture] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    name: '',
    level: '',
    description: '',
    image: '',
  });
  const [lectureForm, setLectureForm] = useState({
    title: '',
    batchNumber: '',
    instructorId: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, instructorsRes] = await Promise.all([
        courseService.getAllCourses(),
        authService.getInstructors(),
      ]);
      setCourses(coursesRes.data);
      setInstructors(instructorsRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await courseService.createCourse(courseForm);
      setCourseForm({ name: '', level: '', description: '', image: '' });
      setShowAddCourse(false);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add course');
    }
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      setError('Please select a course');
      return;
    }

    try {
      await lectureService.addLecture({
        ...lectureForm,
        courseId: selectedCourse._id,
      });
      setLectureForm({
        title: '',
        batchNumber: '',
        instructorId: '',
        date: '',
        startTime: '',
        endTime: '',
      });
      setShowAddLecture(false);
      setSelectedCourse(null);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add lecture');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(courseId);
        fetchData();
      } catch (err) {
        setError('Failed to delete course');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>📚 Manage Courses & Lectures</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddCourse(!showAddCourse)}
        >
          {showAddCourse ? 'Cancel' : '+ Add Course'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      {showAddCourse && (
        <div className="form-container">
          <h2>Add New Course</h2>
          <form onSubmit={handleAddCourse}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Course Name"
                value={courseForm.name}
                onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Level (e.g., Beginner, Intermediate, Advanced)"
                value={courseForm.level}
                onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                required
              />
            </div>
            <textarea
              placeholder="Description"
              value={courseForm.description}
              onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
              required
              rows="3"
            />
            <input
              type="url"
              placeholder="Image URL (optional)"
              value={courseForm.image}
              onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
            />
            <button type="submit" className="btn btn-success">
              Create Course
            </button>
          </form>
        </div>
      )}

      <div className="courses-list">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img src={course.image} alt={course.name} className="course-image" />
            <div className="course-content">
              <h2>{course.name}</h2>
              <p className="level">{course.level}</p>
              <p className="description">{course.description}</p>
              <div className="course-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowAddLecture(true);
                  }}
                >
                  + Add Lecture
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCourse(course._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddLecture && selectedCourse && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowAddLecture(false)}>
              ×
            </button>
            <h2>Add Lecture to {selectedCourse.name}</h2>
            <form onSubmit={handleAddLecture}>
              <input
                type="text"
                placeholder="Lecture Title"
                value={lectureForm.title}
                onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Batch Number"
                value={lectureForm.batchNumber}
                onChange={(e) => setLectureForm({ ...lectureForm, batchNumber: e.target.value })}
                required
              />
              <select
                value={lectureForm.instructorId}
                onChange={(e) => setLectureForm({ ...lectureForm, instructorId: e.target.value })}
                required
              >
                <option value="">Select Instructor</option>
                {instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={lectureForm.date}
                onChange={(e) => setLectureForm({ ...lectureForm, date: e.target.value })}
                required
              />
              <input
                type="time"
                placeholder="Start Time"
                value={lectureForm.startTime}
                onChange={(e) => setLectureForm({ ...lectureForm, startTime: e.target.value })}
                required
              />
              <input
                type="time"
                placeholder="End Time"
                value={lectureForm.endTime}
                onChange={(e) => setLectureForm({ ...lectureForm, endTime: e.target.value })}
                required
              />
              <button type="submit" className="btn btn-success">
                Add Lecture
              </button>
            </form>
          </div>
        </div>
      )}

      {courses.length === 0 && (
        <div className="empty-state">
          <p>No courses found. Add your first course!</p>
        </div>
      )}
    </div>
  );
};
