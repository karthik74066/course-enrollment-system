import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student APIs
export const studentAPI = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  create: (student) => api.post('/students', student),
  update: (id, student) => api.put(`/students/${id}`, student),
  delete: (id) => api.delete(`/students/${id}`),
};

// Course APIs
export const courseAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (course) => api.post('/courses', course),
  update: (id, course) => api.put(`/courses/${id}`, course),
  delete: (id) => api.delete(`/courses/${id}`),
};

// Enrollment APIs
export const enrollmentAPI = {
  enroll: (studentId, courseId) => 
    api.post('/enrollments/enroll', { studentId, courseId }),
  unenroll: (studentId, courseId) => 
    api.post('/enrollments/unenroll', { studentId, courseId }),
  getStudentCourses: (studentId) => 
    api.get(`/enrollments/student/${studentId}/courses`),
  getCourseStudents: (courseId) => 
    api.get(`/enrollments/course/${courseId}/students`),
};

export default api;