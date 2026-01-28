# 🚀 Guía de Deployment - Club Deportivo Creeser

## 📋 Opciones de Deployment

### 1. Vercel (Recomendado) ⭐

**Ventajas:**
- ✅ Gratis para proyectos personales
- ✅ Deploy automático desde Git
- ✅ SSL incluido
- ✅ CDN global
- ✅ Preview deployments

**Pasos:**

1. **Crear cuenta en Vercel**
   - Visita: https://vercel.com
   - Sign up con GitHub

2. **Conectar repositorio**
   ```bash
   # Primero, sube tu código a GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repo-url>
   git push -u origin main
   ```

3. **Importar proyecto en Vercel**
   - Click en "New Project"
   - Selecciona tu repositorio
   - Framework Preset: Vite
   - Click "Deploy"

4. **Configuración automática**
   - Vercel detecta Vite automáticamente
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **¡Listo!**
   - Tu sitio estará en: `https://tu-proyecto.vercel.app`

---

### 2. Netlify

**Ventajas:**
- ✅ Gratis para proyectos personales
- ✅ Drag & drop deployment
- ✅ Forms integrados
- ✅ Functions serverless

**Pasos:**

1. **Build local**
   ```bash
   npm run build
   ```

2. **Drag & Drop**
   - Visita: https://app.netlify.com/drop
   - Arrastra la carpeta `dist`
   - ¡Listo!

**O con Git:**

1. **Conectar repositorio**
   - New site from Git
   - Selecciona tu repo
   - Build command: `npm run build`
   - Publish directory: `dist`

---

### 3. GitHub Pages

**Ventajas:**
- ✅ Gratis
- ✅ Integrado con GitHub
- ✅ Fácil de configurar

**Pasos:**

1. **Instalar gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Actualizar package.json**
   ```json
   {
     "homepage": "https://tu-usuario.github.io/creeser-club",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Actualizar vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/creeser-club/',
     // ... resto de la config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

## 🔧 Configuración Pre-Deploy

### 1. Variables de Entorno

Crea `.env.production`:
```env
VITE_API_URL=https://api.creeser.cl
VITE_APP_NAME=Club Deportivo Creeser
VITE_APP_URL=https://creeser.cl
```

### 2. Optimización de Build

**vite.config.js:**
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
        },
      },
    },
  },
})
```

### 3. SEO y Meta Tags

**index.html:**
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Club Deportivo Creeser - Taekwondo en Santiago, Chile" />
  <meta name="keywords" content="taekwondo, artes marciales, santiago, chile, creeser" />
  <meta property="og:title" content="Club Deportivo Creeser" />
  <meta property="og:description" content="Formando campeones a través del Taekwondo" />
  <meta property="og:image" content="/og-image.jpg" />
  <title>Club Deportivo Creeser | Taekwondo</title>
</head>
```

---

## 📊 Checklist Pre-Deploy

### Código
- [ ] Eliminar console.logs
- [ ] Revisar errores en consola
- [ ] Probar en diferentes navegadores
- [ ] Validar responsive
- [ ] Optimizar imágenes

### Configuración
- [ ] Configurar variables de entorno
- [ ] Actualizar URLs de API
- [ ] Configurar redirects
- [ ] Configurar 404 page

### SEO
- [ ] Agregar meta tags
- [ ] Crear sitemap.xml
- [ ] Crear robots.txt
- [ ] Configurar Google Analytics
- [ ] Configurar Google Search Console

### Performance
- [ ] Minificar assets
- [ ] Optimizar imágenes (WebP)
- [ ] Lazy loading de imágenes
- [ ] Code splitting
- [ ] Caché de assets

### Seguridad
- [ ] HTTPS configurado
- [ ] Headers de seguridad
- [ ] Validación de inputs
- [ ] Sanitización de datos
- [ ] Rate limiting (backend)

---

## 🌐 Configuración de Dominio Personalizado

### En Vercel

1. **Agregar dominio**
   - Settings → Domains
   - Add domain: `creeser.cl`

2. **Configurar DNS**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Esperar propagación** (24-48 horas)

### En Netlify

1. **Agregar dominio**
   - Domain settings → Add custom domain

2. **Configurar DNS**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: tu-sitio.netlify.app
   ```

---

## 📈 Monitoreo Post-Deploy

### 1. Google Analytics

**Instalar:**
```bash
npm install react-ga4
```

**Configurar:**
```javascript
// src/utils/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-XXXXXXXXXX');
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
```

### 2. Error Tracking (Sentry)

**Instalar:**
```bash
npm install @sentry/react
```

**Configurar:**
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "tu-dsn",
  environment: "production",
});
```

### 3. Performance Monitoring

**Herramientas:**
- Lighthouse (Chrome DevTools)
- PageSpeed Insights
- GTmetrix
- WebPageTest

---

## 🔄 CI/CD Automático

### GitHub Actions

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
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
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

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Limpiar node_modules
rm -rf node_modules package-lock.json
npm install
```

**Error: Out of memory**
```bash
# Aumentar memoria de Node
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Routing Issues

**404 en rutas**

**Vercel** - Crear `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Netlify** - Crear `public/_redirects`:
```
/*    /index.html   200
```

### Performance Issues

**Imágenes grandes**
```bash
# Optimizar imágenes
npm install -g sharp-cli
sharp -i input.jpg -o output.webp
```

**Bundle size grande**
```bash
# Analizar bundle
npm run build -- --mode analyze
```

---

## 📱 PWA (Progressive Web App)

### Configurar PWA

1. **Instalar plugin**
   ```bash
   npm install vite-plugin-pwa -D
   ```

2. **Configurar vite.config.js**
   ```javascript
   import { VitePWA } from 'vite-plugin-pwa'

   export default defineConfig({
     plugins: [
       react(),
       VitePWA({
         registerType: 'autoUpdate',
         manifest: {
           name: 'Club Deportivo Creeser',
           short_name: 'Creeser',
           description: 'Club de Taekwondo',
           theme_color: '#4f46e5',
           icons: [
             {
               src: 'icon-192.png',
               sizes: '192x192',
               type: 'image/png'
             },
             {
               src: 'icon-512.png',
               sizes: '512x512',
               type: 'image/png'
             }
           ]
         }
       })
     ]
   })
   ```

---

## ✅ Post-Deploy Checklist

- [ ] Sitio accesible en producción
- [ ] SSL/HTTPS funcionando
- [ ] Todas las páginas cargan correctamente
- [ ] Formularios funcionan
- [ ] Autenticación funciona
- [ ] Responsive en todos los dispositivos
- [ ] Performance score > 90 (Lighthouse)
- [ ] SEO configurado
- [ ] Analytics funcionando
- [ ] Error tracking configurado
- [ ] Dominio personalizado configurado
- [ ] Redirects funcionando
- [ ] 404 page personalizada

---

## 🎉 ¡Deploy Exitoso!

Tu aplicación está ahora en producción. Próximos pasos:

1. **Monitorear** métricas y errores
2. **Recopilar** feedback de usuarios
3. **Iterar** y mejorar
4. **Escalar** según necesidad

---

**¿Preguntas?** Revisa la documentación de tu plataforma de hosting.

**Recursos:**
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev/guide/
