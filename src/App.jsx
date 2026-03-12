import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './features/auth/context/AuthContext';

// Layouts
import MainLayout from './shared/layouts/MainLayout';
import AuthLayout from './shared/layouts/AuthLayout';

// Guards
import { ProtectedRoute, PublicRoute } from './shared/components/layout/RouteGuard';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/user/Dashboard';
import Classes from './pages/Classes';
import ClassDetail from './pages/ClassDetail';
import Memberships from './pages/Memberships';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/user/Profile';
import Bookings from './pages/user/Bookings';
import NotFound from './pages/NotFound';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/clases" element={<MainLayout><Classes /></MainLayout>} />
        <Route path="/clases/:id" element={<MainLayout><ClassDetail /></MainLayout>} />
        <Route path="/membresias" element={<MainLayout><Memberships /></MainLayout>} />
        <Route path="/eventos" element={<MainLayout><Events /></MainLayout>} />
        <Route path="/nosotros" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contacto" element={<MainLayout><Contact /></MainLayout>} />

        {/* Auth Routes with AuthLayout */}
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

        {/* Protected Routes with MainLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agendar"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Bookings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
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
