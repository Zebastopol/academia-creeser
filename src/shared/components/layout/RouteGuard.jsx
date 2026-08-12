import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/context/AuthContext';

const IS_PROD = import.meta.env.PROD
const ENABLE_INTERNAL_PANELS = import.meta.env.VITE_ENABLE_INTERNAL_PANELS === 'true'

export const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="loading-spinner" />
  </div>
);

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

/**
 * En producción, los paneles admin/instructor se deshabilitan por defecto
 * a menos que VITE_ENABLE_INTERNAL_PANELS=true esté configurado.
 * Esto evita acceso no autorizado mientras no exista backend real con JWT.
 */
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (IS_PROD && !ENABLE_INTERNAL_PANELS) return <Navigate to="/" />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  return children;
};

export const InstructorRoute = ({ children }) => {
  const { isAuthenticated, isInstructor, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (IS_PROD && !ENABLE_INTERNAL_PANELS) return <Navigate to="/" />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isInstructor && !isAdmin) return <Navigate to="/dashboard" />;
  return children;
};
