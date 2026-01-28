import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('creeser_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Credenciales inválidas');
      }

      // No guardar la contraseña en el estado
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('creeser_user', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verificar si el email ya existe
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // Crear nuevo usuario
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        role: 'member',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        memberSince: new Date().toISOString().split('T')[0],
        belt: 'Cinturón Blanco'
      };

      // En una app real, esto se guardaría en la base de datos
      mockUsers.push(newUser);

      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('creeser_user', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('creeser_user');
  };

  const updateProfile = async (updates) => {
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('creeser_user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const isAdmin = () => user?.role === 'admin';
  const isInstructor = () => user?.role === 'instructor';
  const isMember = () => user?.role === 'member';

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAdmin,
    isInstructor,
    isMember,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
