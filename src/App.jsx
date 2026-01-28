import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/user/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Layout without Footer (for auth pages)
const AuthLayout = ({ children }) => {
  return <main>{children}</main>;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* Auth Routes without Layout */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthLayout>
                <Login />
              </AuthLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/registro"
          element={
            <PublicRoute>
              <AuthLayout>
                <Register />
              </AuthLayout>
            </PublicRoute>
          }
        />

        {/* Protected Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Placeholder routes - to be implemented */}
        <Route
          path="/clases"
          element={
            <Layout>
              <div className="min-h-screen pt-24 pb-12">
                <div className="container-custom">
                  <h1 className="text-4xl font-bold text-center">Clases</h1>
                  <p className="text-center text-gray-600 mt-4">Página en construcción</p>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/membresias"
          element={
            <Layout>
              <div className="min-h-screen pt-24 pb-12">
                <div className="container-custom">
                  <h1 className="text-4xl font-bold text-center">Membresías</h1>
                  <p className="text-center text-gray-600 mt-4">Página en construcción</p>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/eventos"
          element={
            <Layout>
              <div className="min-h-screen pt-24 pb-12">
                <div className="container-custom">
                  <h1 className="text-4xl font-bold text-center">Eventos</h1>
                  <p className="text-center text-gray-600 mt-4">Página en construcción</p>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/nosotros"
          element={
            <Layout>
              <div className="min-h-screen pt-24 pb-12">
                <div className="container-custom">
                  <h1 className="text-4xl font-bold text-center">Nosotros</h1>
                  <p className="text-center text-gray-600 mt-4">Página en construcción</p>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/contacto"
          element={
            <Layout>
              <div className="min-h-screen pt-24 pb-12">
                <div className="container-custom">
                  <h1 className="text-4xl font-bold text-center">Contacto</h1>
                  <p className="text-center text-gray-600 mt-4">Página en construcción</p>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="min-h-screen pt-24 pb-12">
                  <div className="container-custom">
                    <h1 className="text-4xl font-bold text-center">Mi Perfil</h1>
                    <p className="text-center text-gray-600 mt-4">Página en construcción</p>
                  </div>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agendar"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="min-h-screen pt-24 pb-12">
                  <div className="container-custom">
                    <h1 className="text-4xl font-bold text-center">Agendar Clase</h1>
                    <p className="text-center text-gray-600 mt-4">Página en construcción</p>
                  </div>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <Layout>
              <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
                  <a href="/" className="btn-primary">
                    Volver al Inicio
                  </a>
                </div>
              </div>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  );
}

export default App;
