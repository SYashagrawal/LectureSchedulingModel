import { useEffect, useState } from 'react';
import { lectureService } from '../services/api';
import './InstructorDashboard.css';

export const InstructorDashboard = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await lectureService.getLecturesByInstructor();
      setLectures(response.data);
    } catch (err) {
      setError('Failed to fetch lectures');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="instructor-dashboard">
      <div className="dashboard-header">
        <h1>📅 My Assigned Lectures</h1>
        <p>Total Lectures: {lectures.length}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="lectures-table">
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Level</th>
              <th>Lecture Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture) => (
              <tr key={lecture._id}>
                <td>
                  <strong>{lecture.courseId.name}</strong>
                </td>
                <td>
                  <span className="level-badge">{lecture.courseId.level}</span>
                </td>
                <td>{lecture.title}</td>
                <td>{new Date(lecture.date).toLocaleDateString()}</td>
                <td>
                  {lecture.startTime} - {lecture.endTime}
                </td>
                <td className="description-cell">{lecture.courseId.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lectures.length === 0 && (
        <div className="empty-state">
          <p>No lectures assigned yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
};
