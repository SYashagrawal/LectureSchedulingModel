import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      navigate('/');
    }
  }, [token, user, requiredRole, navigate]);

  if (!token) {
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return children;
};
