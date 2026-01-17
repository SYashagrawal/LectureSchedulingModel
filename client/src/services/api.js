import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://lectureschedulingmodel.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Service
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  getInstructors: () => api.get('/auth/instructors'),
};

// Course Service
export const courseService = {
  createCourse: (data) => api.post('/courses', data),
  getAllCourses: () => api.get('/courses'),
  getCourseById: (id) => api.get(`/courses/${id}`),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
};

// Lecture Service
export const lectureService = {
  addLecture: (data) => api.post('/lectures', data),
  getAllLectures: () => api.get('/lectures'),
  getLecturesByCourse: (courseId) => api.get(`/lectures/course/${courseId}`),
  getLecturesByInstructor: () => api.get('/lectures/instructor/my-lectures'),
  updateLecture: (id, data) => api.put(`/lectures/${id}`, data),
  deleteLecture: (id) => api.delete(`/lectures/${id}`),
  checkAvailability: (instructorId, date) =>
    api.get('/lectures/availability/check', { params: { instructorId, date } }),
};

export default api;
