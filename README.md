# 🥋 Club Deportivo Creeser - Plataforma Web

Plataforma web moderna para el Club Deportivo Creeser, especializado en Taekwondo. Incluye sistema de gestión de clases, agendamiento, membresías y panel de administración.

## 🚀 Características

### ✨ Funcionalidades Principales

- **Sitio Web Público**
  - Hero section animado e impactante
  - Información de clases y horarios
  - Planes de membresía
  - Eventos y seminarios
  - Testimonios de alumnos
  - Galería de fotos
  - Formulario de contacto

- **Sistema de Autenticación**
  - Registro de nuevos usuarios
  - Login con validación
  - Recuperación de contraseña
  - Roles de usuario (Admin, Instructor, Socio)

- **Dashboard de Usuario**
  - Vista personalizada según rol
  - Estadísticas de progreso en tiempo real
  - Clases agendadas
  - Historial de asistencia
  - Gestión de perfil

- **Perfil de Usuario** ✅
  - Edición de datos personales con validaciones
  - Cambio de contraseña con indicador de fortaleza
  - Historial cronológico de clases con filtros
  - Sistema de logros y gamificación
  - Barras de progreso de cinturón y asistencia

- **Sistema de Agendamiento** ✅
  - Calendario interactivo mensual (grilla 5x7)
  - Filtros mandatorios por sede y clase
  - Selección múltiple con persistencia de sesión
  - Confirmación batch de reservas
  - Sistema de cancelación
  - Preparado para Google Calendar API

- **Panel de Administración** ✅
  - Dashboard con KPIs: marketing, ingresos, contactos
  - Calendario académico (React Big Calendar) con programas, exámenes, competencias
  - Gestión de usuarios (CRUD + métricas por alumno)
  - Gestión de clases (CRUD con horarios dinámicos)
  - Gestión de eventos (CRUD completo)
  - Gestión global de reservas (filtros, edición, cancelación)
  - Reportes de asistencia y popularidad (Recharts)
  - Protección de rutas por rol (AdminRoute)

- **Panel de Instructor** ✅
  - Dashboard con KPIs: alumnos activos, clases asignadas, asistencia mensual
  - Horario semanal visual con clases del día
  - Vista de clases asignadas con estadísticas por clase
  - Lista de alumnos por clase con métricas de asistencia y cinturón
  - Sistema de marcaje de asistencia (present/absent/late) con batch save
  - Historial de asistencia por clase
  - Reportes de progreso por alumno (timeline + gráficos) y por clase (tendencias)
  - Notas de progreso con categorías (técnica, actitud, físico, general)
  - Protección de rutas por rol (InstructorRoute)

## 🛠️ Tecnologías

### Frontend
- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones
- **React Router DOM** - Navegación
- **React Icons** - Iconos
- **React Toastify** - Notificaciones
- **Recharts** - Gráficos y visualización de datos
- **React Big Calendar** - Calendario académico interactivo
- **Axios** - Cliente HTTP
- **Date-fns** - Manejo de fechas

### Backend (Futuro)
- **Node.js + Express** - API REST
- **SQLite/PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Bcrypt** - Encriptación

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd creeser-club
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🔑 Credenciales de Prueba

Para probar la aplicación, usa estas credenciales:

| Rol | Email | Contraseña |
|-----|-------|------------|
| **Administrador** | admin@creeser.cl | admin123 |
| **Instructor** | instructor@creeser.cl | instructor123 |
| **Socio** | socio@creeser.cl | socio123 |

## 📁 Estructura del Proyecto

```
creeser-club/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── layout/       # Navbar, Footer
│   │   └── common/       # Hero, Cards, etc.
│   ├── pages/            # Páginas de la aplicación
│   │   ├── admin/        # Panel de administración
│   │   └── user/         # Dashboard de usuario
│   ├── context/          # Context API (Auth, etc.)
│   ├── services/         # Servicios API
│   ├── utils/            # Utilidades
│   ├── data/             # Datos mock
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Entry point
│   └── index.css         # Estilos globales
├── tailwind.config.js    # Configuración Tailwind
├── vite.config.js        # Configuración Vite
└── package.json          # Dependencias
```

## 🎨 Paleta de Colores

La aplicación utiliza una paleta inspirada en el Taekwondo:

- **Primario (Azul)**: `#4f46e5` - Representa disciplina y profesionalismo
- **Acento (Rojo)**: `#ef4444` - Energía y pasión
- **Dorado**: `#eab308` - Excelencia y logros
- **Blanco/Negro**: Pureza y cinturón negro

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Crea build de producción
npm run preview      # Preview del build

# Linting
npm run lint         # Ejecuta ESLint
```

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## ✨ Características de Diseño

### Animaciones
- Fade in/out
- Slide up/down
- Scale transformations
- Smooth transitions
- Scroll animations

### UX/UI
- Diseño moderno y limpio
- Navegación intuitiva
- Feedback visual inmediato
- Loading states
- Error handling
- Toast notifications

## 🔄 Estado del Proyecto

**Versión:** 1.5.0 (Fase 10 - Panel de Instructor)
**Estado:** ✅ LISTO PARA DEPLOYMENT
**Última Actualización:** 02-04-2026

### 🌐 URLs del Proyecto
- **Desarrollo:** http://localhost:5173
- **Preview:** http://localhost:4173
- **Producción:** https://academia-creeser.vercel.app _(próximamente)_

### ✅ Testing y Optimización Completados
- **Build de Producción:** ✅ Exitoso con code splitting
- **Servidor de Desarrollo:** ✅ Corriendo sin errores
- **Compilación:** ✅ Sin errores
- **Dependencias:** ✅ Todas instaladas correctamente
- **SEO:** ✅ Meta tags optimizados
- **Performance:** ✅ Code splitting implementado
- **Seguridad:** ✅ Headers configurados

📊 **Ver [TESTING-REPORT.md](./TESTING-REPORT.md) para detalles completos del testing**
🚀 **Ver [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) para guía de deployment**
=======
## 🚀 Deployment

### Preparación Completada ✅

El proyecto está completamente preparado para deployment con:

- ✅ Configuración de Vercel (`vercel.json`)
- ✅ Variables de entorno (`.env.production`)
- ✅ SEO optimizado (meta tags, robots.txt)
- ✅ Code splitting (react-vendor, ui-vendor)
- ✅ Build optimizado con esbuild
- ✅ Headers de seguridad configurados
- ✅ Rewrites para SPA routing

### Deploy Rápido

**Opción 1: Vercel (Recomendado)**
```bash
# 1. Push a GitHub
git add .
git commit -m "feat: Preparar para deployment"
git push origin main

# 2. Importar en Vercel
# - Ve a https://vercel.com
# - Importa el repositorio
# - Deploy automático
```

**Opción 2: Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Opción 3: Netlify**
```bash
npm run build
# Arrastra la carpeta 'dist' a https://app.netlify.com/drop
```

📖 **Guía completa:** [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)


### ✅ Completado
- [x] Configuración inicial
- [x] Sistema de autenticación
- [x] Página principal
- [x] Navbar y Footer
- [x] Login y Registro
- [x] Dashboard básico
- [x] Build de producción
- [x] Testing completo
- [x] Páginas públicas (Clases, Eventos, Membresías, About, Contacto, FAQ)

### 🚧 En Desarrollo
- [x] Sistema de agendamiento ✅
- [x] Perfil de usuario completo ✅
- [x] Panel de administración ✅
- [x] Panel de instructor ✅

### 📋 Planificado
- [ ] Backend API
- [ ] Base de datos
- [ ] Sistema de pagos
- [ ] Notificaciones push
- [ ] App móvil

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

### Fase 1: MVP (Actual)
- ✅ Sitio web público
- ✅ Sistema de autenticación
- ✅ Dashboard básico

### Fase 2: Funcionalidades Core
- 🚧 Sistema de agendamiento
- 🚧 Panel de administración
- 🚧 Gestión de usuarios

### Fase 3: Backend
- 📋 API REST
- 📋 Base de datos
- 📋 Autenticación JWT

### Fase 4: Características Avanzadas
- 📋 Sistema de pagos
- 📋 Notificaciones
- 📋 Analytics
- 📋 Reportes

### Fase 5: Optimización
- 📋 Performance
- 📋 SEO
- 📋 PWA
- 📋 Testing

## 📄 Licencia

Este proyecto es privado y pertenece a Academia Deportiva Creeser.

## 👥 Equipo

- **Desarrollo**: Zebastopol
- **Cliente**: Academia Creeser

## 📞 Contacto

- **Email**: web.agency.zpol@gmail.com
- **Teléfono**: +56 9 1234 5678
- **Dirección**: Palmas de Mallorca 673 , La Reina, Santiago de Chile

---


**Desarrollado con ❤️y🐙🐈‍⬛ para Club Deportivo Creeser**
# academia-creeser
