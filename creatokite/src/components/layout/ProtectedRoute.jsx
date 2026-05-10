import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Loader from '../common/Loader';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader full message="Verifying access..." />;
  }

  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has the required role
  if (allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.role)) {
    // Check localStorage fallback just in case profile state hasn't updated
    const cached = localStorage.getItem(`creatokite:profile:${user.uid}`);
    try {
      const cachedProfile = cached ? JSON.parse(cached) : null;
      if (cachedProfile && allowedRoles.includes(cachedProfile.role)) {
        return children;
      }
    } catch {
      // Ignore cache errors
    }

    // Role mismatch, send back to their respective dashboard
    const home = profile.role === 'brand' ? '/brand' : profile.role === 'admin' ? '/admin' : '/creator';
    return <Navigate to={home} replace />;
  }

  return children;
}
