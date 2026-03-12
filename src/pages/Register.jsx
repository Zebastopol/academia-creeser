import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GiKimono } from 'react-icons/gi';
import { toast } from 'react-toastify';
import { useAuth } from '../features/auth/context/AuthContext';
import Button from '../shared/components/atoms/Button';
import SEO from '../shared/components/common/SEO';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Las contraseñas no coinciden');
    }

    setIsLoading(true);

    try {
      const { confirmPassword: _, ...registerData } = formData;
      const result = await register(registerData);
      
      if (result.success) {
        toast.success('¡Cuenta creada exitosamente!');
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Error al registrarse');
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <SEO title="Registro" />
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-accent-600/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80"
          alt="Taekwondo Training"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent-900 via-transparent to-transparent z-20" />
        <div className="absolute bottom-12 left-12 right-12 z-30 text-white">
          <blockquote className="text-2xl font-display font-italic mb-4">
            "Empieza hoy tu camino hacia la excelencia y la disciplina."
          </blockquote>
          <p className="font-bold text-gold-400">Únete a la familia Creeser</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
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

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Crea tu cuenta</h2>
          <p className="text-gray-600 mb-8">Únete a nuestro club y comienza tu entrenamiento.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-gray-500 hover:text-primary-600 flex items-center"
              >
                {showPassword ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
                {showPassword ? "Ocultar" : "Mostrar"} contraseñas
              </button>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Al registrarte, aceptas nuestros <Link to="/" className="text-primary-600">Términos y Condiciones</Link> y <Link to="/" className="text-primary-600">Política de Privacidad</Link>.
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Crear Cuenta
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Inicia sesión aquí
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
