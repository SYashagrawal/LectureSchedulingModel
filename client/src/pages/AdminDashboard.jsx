import { useEffect, useState } from 'react';
import { authService } from '../services/api';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await authService.getInstructors();
      setInstructors(response.data);
    } catch (err) {
      setError('Failed to fetch instructors');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>👨‍🏫 Instructors Management</h1>
        <p>Total Instructors: {instructors.length}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="instructors-grid">
        {instructors.map((instructor) => (
          <div key={instructor._id} className="instructor-card">
            <div className="instructor-header">
              <h3>{instructor.name}</h3>
              <span className="role-badge">{instructor.role}</span>
            </div>
            <div className="instructor-info">
              <p>
                <strong>Email:</strong> {instructor.email}
              </p>
              <p>
                <strong>Joined:</strong> {new Date(instructor.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {instructors.length === 0 && (
        <div className="empty-state">
          <p>No instructors found. Register instructors first.</p>
        </div>
      )}
    </div>
  );
};
