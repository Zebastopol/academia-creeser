import { mockUsers } from '../../../shared/data/mockData';

const AUTH_KEY = 'creeser_user';

const sleep = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(email, password) {
    await sleep();
    
    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  async register(userData) {
    await sleep();
    
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'member',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      memberSince: new Date().toISOString().split('T')[0],
      belt: 'Cinturón Blanco'
    };

    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser() {
    const savedUser = localStorage.getItem(AUTH_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  },

  async updateProfile(userId, updates) {
    await sleep();
    const currentUser = this.getCurrentUser();
    
    if (!currentUser || currentUser.id !== userId) {
      throw new Error('No autorizado');
    }

    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  }
};
