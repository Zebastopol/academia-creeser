import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/context/AuthContext';

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
 * Acceso admin: cualquier entorno, solo verifica isAdmin del contexto.
 * El panel muestra un banner "En Construcción" hasta que exista backend real.
 */
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  return children;
};

/**
 * Acceso instructor: cualquier entorno, solo verifica isInstructor/isAdmin del contexto.
 * El panel muestra un banner "En Construcción" hasta que exista backend real.
 */
export const InstructorRoute = ({ children }) => {
  const { isAuthenticated, isInstructor, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isInstructor && !isAdmin) return <Navigate to="/dashboard" />;
  return children;
};
