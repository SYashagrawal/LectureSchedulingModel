import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 Lecture Scheduler
        </Link>
        <div className="nav-menu">
          {user ? (
            <>
              <span className="user-info">
                Welcome, <strong>{user.name}</strong> ({user.role})
              </span>
              {user.role === 'admin' ? (
                <>
                  <Link to="/admin/dashboard" className="nav-link">
                    Admin Panel
                  </Link>
                  <Link to="/admin/courses" className="nav-link">
                    Manage Courses
                  </Link>
                </>
              ) : (
                <Link to="/instructor/dashboard" className="nav-link">
                  My Lectures
                </Link>
              )}
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
