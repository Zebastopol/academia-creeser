# 📂 Estructura del Proyecto - Club Deportivo Creeser

## 🌳 Árbol de Directorios

```
creeser-club/
│
├── 📄 package.json                 # Dependencias y scripts
├── 📄 vite.config.js              # Configuración de Vite
├── 📄 tailwind.config.js          # Configuración de Tailwind CSS
├── 📄 postcss.config.js           # Configuración de PostCSS
├── 📄 index.html                  # HTML principal
│
├── 📚 Documentación
│   ├── 📄 README.md               # Documentación principal
│   ├── 📄 TODO.md                 # Lista de tareas
│   ├── 📄 PROYECTO-RESUMEN.md     # Resumen del proyecto
│   ├── 📄 GUIA-RAPIDA.md          # Guía de inicio rápido
│   ├── 📄 DEPLOYMENT.md           # Guía de deployment
│   └── 📄 ESTRUCTURA.md           # Este archivo
│
├── 📁 public/                     # Archivos estáticos
│   └── vite.svg
│
└── 📁 src/                        # Código fuente
    │
    ├── 📄 main.jsx                # Entry point
    ├── 📄 App.jsx                 # Componente principal + Rutas
    ├── 📄 index.css               # Estilos globales
    │
    ├── 📁 components/             # Componentes reutilizables
    │   │
    │   ├── 📁 layout/             # Componentes de layout
    │   │   ├── 📄 Navbar.jsx      # Barra de navegación
    │   │   └── 📄 Footer.jsx      # Pie de página
    │   │
    │   └── 📁 common/             # Componentes comunes
    │       └── 📄 Hero.jsx        # Hero section
    │
    ├── 📁 pages/                  # Páginas de la aplicación
    │   │
    │   ├── 📄 Home.jsx            # Página principal
    │   ├── 📄 Login.jsx           # Inicio de sesión
    │   ├── 📄 Register.jsx        # Registro
    │   │
    │   ├── 📁 user/               # Páginas de usuario
    │   │   └── 📄 Dashboard.jsx   # Dashboard de usuario
    │   │
    │   └── 📁 admin/              # Páginas de admin (futuro)
    │       └── (vacío)
    │
    ├── 📁 context/                # Context API
    │   └── 📄 AuthContext.jsx     # Contexto de autenticación
    │
    ├── 📁 services/               # Servicios API (futuro)
    │   └── (vacío)
    │
    ├── 📁 utils/                  # Utilidades (futuro)
    │   └── (vacío)
    │
    └── 📁 data/                   # Datos mock
        └── 📄 mockData.js         # Todos los datos de prueba
```

---

## 📊 Desglose por Categoría

### 🎨 Componentes UI (3)

```
components/
├── layout/
│   ├── Navbar.jsx      ← Navegación principal
│   └── Footer.jsx      ← Pie de página
└── common/
    └── Hero.jsx        ← Hero section animado
```

**Características:**
- ✅ Responsive
- ✅ Animaciones con Framer Motion
- ✅ Tailwind CSS
- ✅ Reutilizables

---

### 📄 Páginas (4 + placeholders)

```
pages/
├── Home.jsx           ← Página principal completa
├── Login.jsx          ← Sistema de login
├── Register.jsx       ← Registro de usuarios
└── user/
    └── Dashboard.jsx  ← Dashboard personalizado
```

**Páginas Placeholder:**
- Clases
- Membresías
- Eventos
- Nosotros
- Contacto
- Perfil
- Agendar

---

### 🔧 Configuración (4)

```
Config Files:
├── vite.config.js        ← Configuración de Vite
├── tailwind.config.js    ← Paleta de colores personalizada
├── postcss.config.js     ← PostCSS
└── package.json          ← Dependencias y scripts
```

---

### 📚 Documentación (6)

```
Docs:
├── README.md             ← Documentación completa
├── TODO.md               ← Tareas pendientes
├── PROYECTO-RESUMEN.md   ← Resumen ejecutivo
├── GUIA-RAPIDA.md        ← Inicio rápido
├── DEPLOYMENT.md         ← Guía de deployment
└── ESTRUCTURA.md         ← Este archivo
```

---

## 🎯 Componentes por Funcionalidad

### 🔐 Autenticación
```
AuthContext.jsx          ← Gestión de estado
Login.jsx               ← Página de login
Register.jsx            ← Página de registro
```

**Features:**
- Login/Logout
- Registro
- Roles (Admin, Instructor, Socio)
- Persistencia en localStorage
- Rutas protegidas

---

### 🏠 Sitio Público
```
Home.jsx                ← Página principal
Hero.jsx                ← Hero section
Navbar.jsx              ← Navegación
Footer.jsx              ← Pie de página
```

**Secciones en Home:**
1. Hero animado
2. Características (4 cards)
3. Clases (4 programas)
4. Membresías (3 planes)
5. Testimonios (4 reseñas)
6. Eventos (4 próximos)
7. CTA final

---

### 👤 Área de Usuario
```
Dashboard.jsx           ← Panel principal
(Perfil - futuro)
(Agendar - futuro)
```

**Features:**
- Estadísticas personales
- Clases agendadas
- Acciones rápidas
- Progreso de cinturón

---

## 📦 Datos Mock

```javascript
mockData.js contiene:
├── clubInfo           ← Información del club
├── classes (4)        ← Clases de Taekwondo
├── memberships (3)    ← Planes de membresía
├── testimonials (4)   ← Testimonios
├── events (4)         ← Eventos próximos
├── instructors (3)    ← Instructores
├── gallery (6)        ← Galería de fotos
├── faqs (6)          ← Preguntas frecuentes
├── mockUsers (3)      ← Usuarios de prueba
└── mockBookings (2)   ← Reservas de ejemplo
```

---

## 🎨 Estilos y Diseño

### Tailwind Config
```javascript
Colores personalizados:
├── primary (Azul)     ← #4f46e5
├── accent (Rojo)      ← #ef4444
└── gold (Dorado)      ← #eab308

Animaciones:
├── fade-in
├── slide-up
├── slide-down
└── scale-in
```

### Clases Personalizadas
```css
Botones:
├── btn-primary        ← Azul sólido
├── btn-secondary      ← Outline
└── btn-accent         ← Rojo sólido

Componentes:
├── card               ← Card con hover
├── section-title      ← Títulos grandes
├── section-subtitle   ← Subtítulos
└── gradient-text      ← Texto con gradiente
```

---

## 🔄 Flujo de Datos

```
Usuario
  ↓
App.jsx (Router)
  ↓
AuthProvider (Context)
  ↓
Páginas
  ↓
Componentes
  ↓
mockData.js
```

---

## 🛣️ Sistema de Rutas

```javascript
Rutas Públicas:
├── /                  → Home
├── /clases            → Clases (placeholder)
├── /membresias        → Membresías (placeholder)
├── /eventos           → Eventos (placeholder)
├── /nosotros          → Nosotros (placeholder)
└── /contacto          → Contacto (placeholder)

Rutas de Auth:
├── /login             → Login
└── /registro          → Registro

Rutas Protegidas:
├── /dashboard         → Dashboard
├── /perfil            → Perfil (placeholder)
└── /agendar           → Agendar (placeholder)
```

---

## 📊 Estadísticas del Proyecto

### Archivos
- **Total**: ~20 archivos
- **Componentes**: 3
- **Páginas**: 4 (+ 6 placeholders)
- **Contextos**: 1
- **Configuración**: 4
- **Documentación**: 6

### Líneas de Código
- **JavaScript/JSX**: ~2,500+
- **CSS**: ~200+
- **Config**: ~100+
- **Docs**: ~1,500+

### Dependencias
- **Producción**: 8
- **Desarrollo**: 5

---

## 🎯 Próximas Adiciones

### Componentes Planificados
```
components/
├── common/
│   ├── Loading.jsx        ← Spinner de carga
│   ├── Modal.jsx          ← Modal reutilizable
│   ├── Card.jsx           ← Card genérico
│   └── Button.jsx         ← Botón reutilizable
└── forms/
    ├── Input.jsx          ← Input personalizado
    └── Select.jsx         ← Select personalizado
```

### Páginas Planificadas
```
pages/
├── Classes.jsx            ← Lista de clases
├── ClassDetail.jsx        ← Detalle de clase
├── Memberships.jsx        ← Planes detallados
├── Events.jsx             ← Lista de eventos
├── EventDetail.jsx        ← Detalle de evento
├── About.jsx              ← Sobre nosotros
├── Contact.jsx            ← Formulario de contacto
├── FAQ.jsx                ← Preguntas frecuentes
├── user/
│   ├── Profile.jsx        ← Perfil de usuario
│   └── Booking.jsx        ← Agendar clases
└── admin/
    ├── AdminDashboard.jsx ← Panel admin
    ├── UserManagement.jsx ← Gestión usuarios
    ├── ClassManagement.jsx← Gestión clases
    └── Analytics.jsx      ← Estadísticas
```

---

## 🔍 Cómo Navegar el Proyecto

### Para Entender el Flujo
1. **Empieza en**: `src/main.jsx`
2. **Luego ve a**: `src/App.jsx`
3. **Explora**: `src/pages/Home.jsx`
4. **Revisa**: `src/components/`

### Para Modificar Datos
1. **Abre**: `src/data/mockData.js`
2. **Edita**: Los objetos que necesites
3. **Guarda**: Los cambios se reflejan automáticamente

### Para Agregar Páginas
1. **Crea**: Archivo en `src/pages/`
2. **Importa**: En `src/App.jsx`
3. **Agrega**: Ruta en `<Routes>`
4. **Actualiza**: Navbar si es necesario

### Para Cambiar Estilos
1. **Colores**: `tailwind.config.js`
2. **Globales**: `src/index.css`
3. **Componentes**: Inline con Tailwind

---

## 💡 Tips de Organización

### ✅ Buenas Prácticas Aplicadas
- Componentes pequeños y reutilizables
- Separación de concerns
- Nombres descriptivos
- Comentarios donde es necesario
- Estructura escalable

### 📝 Convenciones
- **Componentes**: PascalCase (Navbar.jsx)
- **Archivos**: camelCase (mockData.js)
- **Carpetas**: lowercase (components/)
- **CSS**: kebab-case (btn-primary)

---

**Esta estructura está diseñada para ser:**
- 🎯 Fácil de entender
- 🔧 Fácil de mantener
- 📈 Fácil de escalar
- 🚀 Lista para producción

---

**¿Necesitas agregar algo?** Sigue la estructura existente y mantén la consistencia.
