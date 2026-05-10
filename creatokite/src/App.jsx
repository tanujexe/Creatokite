import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import ProtectedRoute from './components/layout/ProtectedRoute';

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const CreatorDashboard = lazy(() => import('./pages/creator/CreatorDashboard'));
const BrandDashboard = lazy(() => import('./pages/brand/BrandDashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

import Loader from './components/common/Loader';

function RouteFallback() {
  return <Loader full message="Preparing your workspace..." />;
}

export default function App() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <RouteFallback />;
  }

  // If user exists but profile isn't loaded yet (and not in the middle of a signup)
  // we should wait for the profile to be sure of the role.
  if (user && !profile) {
    return <RouteFallback />;
  }

  // Redirect logged-in users from auth pages to their dashboard
  function dashboardPath() {
    if (profile?.role === 'brand') return '/brand';
    if (profile?.role === 'admin') return '/admin';
    return '/creator';
  }

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            user ? (loading ? <RouteFallback /> : <Navigate to={dashboardPath()} replace />) : <Login />
          }
        />
        <Route
          path="/register"
          element={
            user ? (loading ? <RouteFallback /> : <Navigate to={dashboardPath()} replace />) : <Register />
          }
        />

        {/* Creator */}
        <Route
          path="/creator/*"
          element={
            <ProtectedRoute allowedRoles={['creator']}>
              <CreatorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Brand */}
        <Route
          path="/brand/*"
          element={
            <ProtectedRoute allowedRoles={['brand']}>
              <BrandDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
