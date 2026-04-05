import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './features/auth/context/AuthContext';

// Layouts
import MainLayout from './shared/layouts/MainLayout';
import AuthLayout from './shared/layouts/AuthLayout';
import AdminLayout from './shared/layouts/AdminLayout';
import InstructorLayout from './shared/layouts/InstructorLayout';

// Guards
import { ProtectedRoute, PublicRoute, AdminRoute, InstructorRoute } from './shared/components/layout/RouteGuard';

// Public Pages
import Home from './pages/Home';
import Classes from './pages/Classes';
import ClassDetail from './pages/ClassDetail';
import Memberships from './pages/Memberships';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// User Pages
import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import Bookings from './pages/user/Bookings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminClasses from './pages/admin/AdminClasses';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBookings from './pages/admin/AdminBookings';
import AdminReports from './pages/admin/AdminReports';

// Instructor Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import InstructorClasses from './pages/instructor/InstructorClasses';
import InstructorStudents from './pages/instructor/InstructorStudents';
import InstructorAttendance from './pages/instructor/InstructorAttendance';
import InstructorReports from './pages/instructor/InstructorReports';

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
        <Route path="/eventos/:id" element={<MainLayout><EventDetail /></MainLayout>} />
        <Route path="/nosotros" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contacto" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />

        {/* Auth Routes with AuthLayout */}
        <Route
          path="/login"
          element={<PublicRoute><AuthLayout><Login /></AuthLayout></PublicRoute>}
        />
        <Route
          path="/registro"
          element={<PublicRoute><AuthLayout><Register /></AuthLayout></PublicRoute>}
        />

        {/* Protected User Routes with MainLayout */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>}
        />
        <Route
          path="/perfil"
          element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>}
        />
        <Route
          path="/agendar"
          element={<ProtectedRoute><MainLayout><Bookings /></MainLayout></ProtectedRoute>}
        />

        {/* Admin Routes with AdminLayout */}
        <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
        <Route path="/admin/usuarios" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />
        <Route path="/admin/clases" element={<AdminRoute><AdminLayout><AdminClasses /></AdminLayout></AdminRoute>} />
        <Route path="/admin/eventos" element={<AdminRoute><AdminLayout><AdminEvents /></AdminLayout></AdminRoute>} />
        <Route path="/admin/reservas" element={<AdminRoute><AdminLayout><AdminBookings /></AdminLayout></AdminRoute>} />
        <Route path="/admin/reportes" element={<AdminRoute><AdminLayout><AdminReports /></AdminLayout></AdminRoute>} />

        {/* Instructor Routes with InstructorLayout */}
        <Route path="/instructor" element={<InstructorRoute><InstructorLayout><InstructorDashboard /></InstructorLayout></InstructorRoute>} />
        <Route path="/instructor/clases" element={<InstructorRoute><InstructorLayout><InstructorClasses /></InstructorLayout></InstructorRoute>} />
        <Route path="/instructor/alumnos" element={<InstructorRoute><InstructorLayout><InstructorStudents /></InstructorLayout></InstructorRoute>} />
        <Route path="/instructor/asistencia" element={<InstructorRoute><InstructorLayout><InstructorAttendance /></InstructorLayout></InstructorRoute>} />
        <Route path="/instructor/reportes" element={<InstructorRoute><InstructorLayout><InstructorReports /></InstructorLayout></InstructorRoute>} />

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
