# 🚀 Guía Rápida - Club Deportivo Creeser

## ⚡ Inicio Rápido (5 minutos)

### 1. El servidor ya está corriendo ✅
```
http://localhost:5173
```

### 2. Abre tu navegador y visita:
```
http://localhost:5173
```

### 3. Explora la aplicación:

#### 🏠 Página Principal
- Verás el Hero animado con información del club
- Scroll para ver todas las secciones:
  - ✨ Características del club
  - 📚 Clases disponibles
  - 💎 Planes de membresía
  - 💬 Testimonios
  - 📅 Próximos eventos

#### 🔐 Probar el Login
1. Click en "Iniciar Sesión" (arriba derecha)
2. Usa estas credenciales:
   ```
   Email: socio@creeser.cl
   Password: socio123
   ```
3. Serás redirigido al Dashboard

#### 📊 Dashboard de Usuario
- Verás tus estadísticas
- Clases agendadas
- Acciones rápidas
- Progreso de cinturón

#### 👤 Probar Diferentes Roles

**Como Socio:**
```
Email: socio@creeser.cl
Password: socio123
```

**Como Instructor:**
```
Email: instructor@creeser.cl
Password: instructor123
```

**Como Admin:**
```
Email: admin@creeser.cl
Password: admin123
```

---

## 🎨 Características para Probar

### ✅ Navegación
- Click en los links del menú
- Prueba el menú móvil (reduce el tamaño de la ventana)
- Scroll para ver el navbar cambiar de transparente a sólido

### ✅ Animaciones
- Scroll en la página principal para ver animaciones
- Hover sobre las cards
- Click en los botones

### ✅ Responsive
- Reduce el tamaño de la ventana
- Prueba en diferentes resoluciones
- Abre en tu móvil (usa la IP de red)

### ✅ Autenticación
- Registra un nuevo usuario
- Inicia sesión
- Cierra sesión
- Intenta acceder a rutas protegidas sin login

---

## 📱 Estructura de Navegación

```
🏠 Inicio (/)
├── 📚 Clases (/clases) - En construcción
├── 💎 Membresías (/membresias) - En construcción
├── 📅 Eventos (/eventos) - En construcción
├── ℹ️ Nosotros (/nosotros) - En construcción
└── 📞 Contacto (/contacto) - En construcción

🔐 Autenticación
├── 🔑 Login (/login)
└── 📝 Registro (/registro)

👤 Usuario (Requiere Login)
├── 📊 Dashboard (/dashboard)
├── 👤 Perfil (/perfil) - En construcción
└── 📅 Agendar (/agendar) - En construcción
```

---

## 🎯 Qué Puedes Hacer Ahora

### ✅ Funcional
1. ✅ Ver la página principal completa
2. ✅ Registrar nuevos usuarios
3. ✅ Iniciar sesión con diferentes roles
4. ✅ Ver el dashboard personalizado
5. ✅ Navegar entre páginas
6. ✅ Cerrar sesión

### 🚧 En Construcción
- Páginas públicas adicionales
- Sistema de agendamiento
- Panel de administración completo
- Edición de perfil
- Gestión de clases

---

## 🛠️ Comandos Útiles

### Desarrollo
```bash
npm run dev          # Ya está corriendo
```

### Detener el servidor
```
Ctrl + C (en la terminal)
```

### Reiniciar el servidor
```bash
npm run dev
```

### Build para producción
```bash
npm run build
```

### Preview del build
```bash
npm run preview
```

---

## 🎨 Personalización Rápida

### Cambiar Colores
Edita: `tailwind.config.js`
```javascript
colors: {
  primary: { ... },  // Azul principal
  accent: { ... },   // Rojo acento
  gold: { ... }      // Dorado
}
```

### Cambiar Datos
Edita: `src/data/mockData.js`
- Información del club
- Clases
- Membresías
- Eventos
- Testimonios

### Agregar Nuevas Páginas
1. Crea archivo en `src/pages/`
2. Agrega ruta en `src/App.jsx`
3. Agrega link en `src/components/layout/Navbar.jsx`

---

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Reinstalar dependencias
npm install

# Limpiar caché
npm run dev -- --force
```

### Errores de Tailwind
```bash
# Verificar configuración
cat tailwind.config.js

# Reiniciar servidor
Ctrl + C
npm run dev
```

### Página en blanco
1. Abre la consola del navegador (F12)
2. Revisa errores en la pestaña Console
3. Verifica que el servidor esté corriendo

---

## 📚 Recursos Adicionales

### Documentación
- `README.md` - Documentación completa
- `TODO.md` - Tareas pendientes
- `PROYECTO-RESUMEN.md` - Resumen del proyecto

### Archivos Importantes
- `src/App.jsx` - Rutas y configuración
- `src/data/mockData.js` - Todos los datos
- `src/context/AuthContext.jsx` - Autenticación
- `tailwind.config.js` - Estilos

---

## 🎓 Tips para Desarrollo

### 1. Hot Reload
Los cambios se reflejan automáticamente. Solo guarda el archivo.

### 2. Inspeccionar Elementos
- F12 para abrir DevTools
- Click derecho → Inspeccionar

### 3. Responsive Testing
- F12 → Toggle device toolbar
- Prueba diferentes dispositivos

### 4. Console Logs
Agrega `console.log()` para debug:
```javascript
console.log('Valor:', variable);
```

---

## 🎉 ¡Listo para Explorar!

### Checklist de Prueba
- [ ] Visitar página principal
- [ ] Probar navegación
- [ ] Registrar usuario
- [ ] Iniciar sesión
- [ ] Ver dashboard
- [ ] Probar responsive
- [ ] Cerrar sesión

### Próximos Pasos
1. Familiarízate con la estructura
2. Revisa el código de los componentes
3. Experimenta con los estilos
4. Agrega nuevas funcionalidades

---

## 💡 Ideas para Experimentar

### Fácil
- Cambiar textos en `mockData.js`
- Modificar colores en `tailwind.config.js`
- Agregar nuevas imágenes

### Intermedio
- Crear una nueva página
- Agregar un nuevo componente
- Modificar el diseño del dashboard

### Avanzado
- Implementar el sistema de agendamiento
- Crear el panel de administración
- Conectar con un backend real

---

## 🆘 ¿Necesitas Ayuda?

### Revisa:
1. README.md para documentación completa
2. TODO.md para ver qué falta
3. Comentarios en el código
4. Console del navegador para errores

### Recursos:
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion

---

**¡Disfruta explorando tu nueva plataforma web!** 🚀🥋

**Servidor corriendo en:** http://localhost:5173
