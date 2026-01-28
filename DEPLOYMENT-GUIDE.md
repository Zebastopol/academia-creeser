# 🚀 Guía de Deployment - Academia Creeser

## ✅ Pre-requisitos Completados

- [x] Proyecto optimizado para producción
- [x] Build exitoso generado
- [x] Configuración de Vercel lista
- [x] SEO optimizado
- [x] Variables de entorno configuradas
- [x] Code splitting implementado

---

## 📦 Archivos de Configuración Creados

### 1. `vercel.json`
Configuración para Vercel con:
- Rewrites para SPA routing
- Headers de seguridad
- Caché optimizado para assets

### 2. `.env.production`
Variables de entorno para producción

### 3. `public/robots.txt`
Configuración SEO para crawlers

### 4. `public/_redirects`
Configuración alternativa para Netlify

### 5. `index.html`
Optimizado con:
- Meta tags SEO
- Open Graph tags
- Twitter cards
- Theme color

### 6. `vite.config.js`
Optimizado con:
- Code splitting (react-vendor, ui-vendor)
- Minificación esbuild
- Configuración de puertos

---

## 🚀 DEPLOYMENT EN VERCEL (Recomendado)

### Opción 1: Deploy desde GitHub (Recomendado)

#### Paso 1: Preparar el repositorio
```bash
# Asegúrate de estar en la rama main
git status

# Agregar archivos nuevos
git add .

# Commit de cambios
git commit -m "feat: Preparar proyecto para deployment en Vercel"

# Push a GitHub
git push origin main
```

#### Paso 2: Conectar con Vercel
1. Ve a https://vercel.com
2. Click en "Sign Up" o "Login"
3. Conecta con tu cuenta de GitHub
4. Click en "New Project"
5. Importa el repositorio `academia-creeser`

#### Paso 3: Configurar el proyecto
Vercel detectará automáticamente:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### Paso 4: Variables de Entorno (Opcional)
Si necesitas agregar variables de entorno:
1. En la configuración del proyecto
2. Ve a "Environment Variables"
3. Agrega las variables necesarias

#### Paso 5: Deploy
1. Click en "Deploy"
2. Espera a que termine el build (1-3 minutos)
3. ¡Tu sitio estará en línea!

URL de producción: `https://academia-creeser.vercel.app`

---

### Opción 2: Deploy con Vercel CLI

#### Paso 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

#### Paso 2: Login
```bash
vercel login
```

#### Paso 3: Deploy
```bash
# Deploy a preview
vercel

# Deploy a producción
vercel --prod
```

---

## 🌐 DEPLOYMENT EN NETLIFY (Alternativa)

### Opción 1: Drag & Drop

#### Paso 1: Build local
```bash
npm run build
```

#### Paso 2: Deploy
1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta `dist`
3. ¡Listo!

### Opción 2: Deploy desde Git

#### Paso 1: Conectar repositorio
1. Ve a https://app.netlify.com
2. Click en "New site from Git"
3. Conecta con GitHub
4. Selecciona el repositorio

#### Paso 2: Configurar build
- **Build command:** `npm run build`
- **Publish directory:** `dist`

#### Paso 3: Deploy
Click en "Deploy site"

---

## 🔄 CI/CD Automático

### GitHub Actions (Opcional)

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📊 Verificación Post-Deploy

### Checklist de Verificación

- [ ] Sitio accesible en URL de producción
- [ ] HTTPS funcionando
- [ ] Todas las páginas cargan correctamente
- [ ] Routing funciona (prueba /login, /registro, /dashboard)
- [ ] Autenticación funciona
- [ ] Responsive en mobile, tablet, desktop
- [ ] No hay errores en consola
- [ ] Performance Lighthouse > 90
- [ ] SEO Lighthouse > 90

### Pruebas Recomendadas

1. **Navegación:**
   - Inicio → Login → Dashboard
   - Registro de nuevo usuario
   - Logout

2. **Responsive:**
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)

3. **Performance:**
   - Ejecutar Lighthouse audit
   - Verificar tiempo de carga < 3s

---

## 🔧 Configuración de Dominio Personalizado

### En Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Add domain: `tudominio.com`
4. Configura DNS según instrucciones

### Configuración DNS

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📈 Monitoreo y Analytics

### Google Analytics (Opcional)

1. Crea cuenta en Google Analytics
2. Obtén tracking ID
3. Agrega a `.env.production`:
   ```
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

### Vercel Analytics

1. En tu proyecto Vercel
2. Analytics → Enable
3. Gratis para proyectos hobby

---

## 🐛 Troubleshooting

### Error: 404 en rutas

**Solución:** Verifica que `vercel.json` tenga los rewrites correctos.

### Error: Build fails

**Solución:** 
```bash
# Limpiar caché
rm -rf node_modules dist
npm install
npm run build
```

### Error: Página en blanco

**Solución:** Verifica la consola del navegador para errores.

---

## 📝 Comandos Útiles

```bash
# Build local
npm run build

# Preview build
npm run preview

# Limpiar y rebuild
rm -rf dist && npm run build

# Deploy a Vercel
vercel --prod

# Ver logs de Vercel
vercel logs
```

---

## 🎉 ¡Deployment Exitoso!

Tu aplicación está ahora en producción. 

**Próximos pasos:**
1. Configurar dominio personalizado
2. Agregar Google Analytics
3. Configurar error tracking (Sentry)
4. Implementar backend API
5. Agregar sistema de pagos

---

**Desarrollado con ❤️ para Club Deportivo Creeser**
