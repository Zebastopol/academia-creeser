import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GiKimono } from 'react-icons/gi';
import { toast } from 'react-toastify';
import { useAuth } from '../features/auth/context/AuthContext';
import Button from '../shared/components/atoms/Button';
import SEO from '../shared/components/common/SEO';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('¡Bienvenido de nuevo!');
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <SEO title="Iniciar Sesión" />
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mb-8 justify-center lg:justify-start">
            <div className="p-2 bg-primary-600 rounded-lg">
              <GiKimono className="text-2xl text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-gray-900">CREESER</span>
          </Link>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Hola de nuevo!</h2>
          <p className="text-gray-600 mb-8">Ingresa tus credenciales para acceder a tu panel.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>
              <Link to="/" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Iniciar Sesión
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="font-medium text-primary-600 hover:text-primary-500">
              Regístrate aquí
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image/Decoration */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-primary-600/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1200&q=80"
          alt="Taekwondo Practice"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent z-20" />
        <div className="absolute bottom-12 left-12 right-12 z-30 text-white">
          <blockquote className="text-2xl font-display font-italic mb-4">
            "El Taekwondo no es solo defensa personal, es un camino de vida."
          </blockquote>
          <p className="font-bold text-gold-400">— Maestro Juan Pérez</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
