import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './features/auth/context/AuthContext';
import ErrorBoundary from './shared/components/ErrorBoundary';

// Layouts (cargados siempre -- son ligeros)
import MainLayout from './shared/layouts/MainLayout';
import AuthLayout from './shared/layouts/AuthLayout';

// Guards
import { ProtectedRoute, PublicRoute, AdminRoute, InstructorRoute, LoadingSpinner } from './shared/components/layout/RouteGuard';

// --- Public Pages (cargadas inmediatamente — ruta crítica) ---
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// --- Public Pages (lazy — no críticas para first load) ---
const Classes = lazy(() => import('./pages/Classes'));
const ClassDetail = lazy(() => import('./pages/ClassDetail'));
const Memberships = lazy(() => import('./pages/Memberships'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));

// --- Auth Pages (lazy) ---
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// --- User Pages (lazy) ---
const Dashboard = lazy(() => import('./pages/user/Dashboard'));
const Profile = lazy(() => import('./pages/user/Profile'));
const Bookings = lazy(() => import('./pages/user/Bookings'));
const Checkout = lazy(() => import('./pages/user/Checkout'));

// --- Admin Pages (lazy — solo se carga si es admin) ---
const AdminLayout = lazy(() => import('./shared/layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminClasses = lazy(() => import('./pages/admin/AdminClasses'));
const AdminEvents = lazy(() => import('./pages/admin/AdminEvents'));
const AdminBookings = lazy(() => import('./pages/admin/AdminBookings'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminContent = lazy(() => import('./pages/admin/AdminContent'));

// --- Instructor Pages (lazy — solo se carga si es instructor) ---
const InstructorLayout = lazy(() => import('./shared/layouts/InstructorLayout'));
const InstructorDashboard = lazy(() => import('./pages/instructor/InstructorDashboard'));
const InstructorClasses = lazy(() => import('./pages/instructor/InstructorClasses'));
const InstructorStudents = lazy(() => import('./pages/instructor/InstructorStudents'));
const InstructorAttendance = lazy(() => import('./pages/instructor/InstructorAttendance'));
const InstructorReports = lazy(() => import('./pages/instructor/InstructorReports'));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
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
          <Route
            path="/pagos"
            element={<ProtectedRoute><MainLayout><Checkout /></MainLayout></ProtectedRoute>}
          />

          {/* Admin Routes with AdminLayout */}
          <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
          <Route path="/admin/usuarios" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />
          <Route path="/admin/clases" element={<AdminRoute><AdminLayout><AdminClasses /></AdminLayout></AdminRoute>} />
          <Route path="/admin/eventos" element={<AdminRoute><AdminLayout><AdminEvents /></AdminLayout></AdminRoute>} />
          <Route path="/admin/reservas" element={<AdminRoute><AdminLayout><AdminBookings /></AdminLayout></AdminRoute>} />
          <Route path="/admin/reportes" element={<AdminRoute><AdminLayout><AdminReports /></AdminLayout></AdminRoute>} />
          <Route path="/admin/contenido" element={<AdminRoute><AdminLayout><AdminContent /></AdminLayout></AdminRoute>} />

          {/* Instructor Routes with InstructorLayout */}
          <Route path="/instructor" element={<InstructorRoute><InstructorLayout><InstructorDashboard /></InstructorLayout></InstructorRoute>} />
          <Route path="/instructor/clases" element={<InstructorRoute><InstructorLayout><InstructorClasses /></InstructorLayout></InstructorRoute>} />
          <Route path="/instructor/alumnos" element={<InstructorRoute><InstructorLayout><InstructorStudents /></InstructorLayout></InstructorRoute>} />
          <Route path="/instructor/asistencia" element={<InstructorRoute><InstructorLayout><InstructorAttendance /></InstructorLayout></InstructorRoute>} />
          <Route path="/instructor/reportes" element={<InstructorRoute><InstructorLayout><InstructorReports /></InstructorLayout></InstructorRoute>} />

          {/* 404 Route */}
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
