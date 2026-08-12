# Progreso — Academia Creeser

Estado consolidado de las sesiones de trabajo. Este archivo se mantiene
actualizado entre sesiones para preservar contexto sin re-analizar el codebase.

Nunca contiene valores reales de credenciales — solo nombres de variables.

---

## Sesión actual — Bloques 1/2/3

### ✅ Bloque 1: Desbloqueo Admin/Instructor + Banner "En Construcción"

- **`RouteGuard.jsx`**: eliminadas las líneas `IS_PROD && !ENABLE_INTERNAL_PANELS`
  en `AdminRoute` y `InstructorRoute`. El acceso ya no depende del entorno,
  solo del rol (`isAdmin` / `isInstructor`) del contexto de auth.
- **`shared/components/molecules/ConstructionBanner.jsx`** (nuevo): banner
  amarillo persistente con texto *"En Construcción — esta sección sigue en
  desarrollo, los datos pueden no ser reales"*. Prop `variant`: `'admin' | 'instructor'`.
- **`AdminLayout.jsx`** e **`InstructorLayout.jsx`**: importan e insertan el
  banner debajo del header, por encima del `<main>`. Aparece en TODAS las
  páginas hijas sin repetir código.
- **`.env.production`**: `VITE_ENABLE_INTERNAL_PANELS=true` (ya no controla nada,
  se deja explícito por claridad).
- **Datos sensibles**: verificado — el único `type="password"` es el input de
  creación de usuarios en `UserFormModal.jsx` (nunca muestra passwords existentes).
- **Lógica interna** de admin/instructor **NO tocada**: siguen consumiendo mockData
  hasta la sesión del backend.

### ✅ Bloque 2: Google Places — solo 5 campos

- **`api/reviews.js`** (rewrite): migrado a **Places API New v1**
  (`places.googleapis.com/v1/places/{id}`) con `X-Goog-FieldMask` que solicita
  EXACTAMENTE:
  - `reviews.rating`
  - `reviews.text`
  - `reviews.publishTime`
  - `reviews.authorAttribution.displayName`
  - `reviews.authorAttribution.photoUri`
  - (+ `rating` y `userRatingCount` top-level para KPIs)

  Excluye explícitamente: link, idioma, respuesta del owner, fotos adjuntas,
  reviewSummary (IA). Cache in-memory de **6h** + `Cache-Control` con SWR.

  Credenciales desde `process.env`:
  - `GOOGLE_PLACES_API_KEY` (server-side, Vercel)
  - `GOOGLE_PLACES_ID` (server-side, Vercel)

- **`googlePlacesService.js`**: normaliza al shape estable
  `{ rating, text, date, authorName, authorPhoto }`. Fallback a
  `publicData.testimonials` mapeado al mismo shape si la API falla o no está
  configurada.

- **`TestimonialsSection.jsx`** y **`TestimonialCard.jsx`**: consumen el nuevo
  shape sin cambios visuales. Placeholder por iniciales cuando `authorPhoto`
  está vacío. Role reemplazado por constante `"Reseña de Google"`.

- **`marketingService.getTestimonials()`**: delega en `googlePlacesService`
  para consistencia si otros consumidores lo usan.

### ✅ Bloque 3: Métricas reales de tráfico (Vercel Analytics)

- **Decisión**: se elige **Vercel Analytics** (ya instalado en `main.jsx` vía
  `@vercel/analytics/react`). GA4 solo aparece como comentario en `.env`,
  sin integración funcional — no hubo ambigüedad.

- **`api/traffic-metrics.js`** (nuevo): Serverless function que consulta
  Vercel Web Analytics API con:
  - `VERCEL_TOKEN` (server-side, Vercel)
  - `VERCEL_PROJECT_ID` (server-side, Vercel)
  - `VERCEL_TEAM_ID` (opcional, server-side)

  Query param `range=24h|7d|30d`. Consulta 4 endpoints en paralelo
  (timeseries, top-pages, top-referrers, devices). Manejo de errores con
  degradación elegante (`source: 'not_configured' | 'error' | 'vercel_analytics'`).
  Cache HTTP 5 min con SWR 10 min.

- **`features/admin/services/analyticsService.js`** (nuevo): consume
  `/api/traffic-metrics`. La credencial nunca llega al cliente.

- **`features/admin/hooks/useTrafficMetrics.js`** (nuevo): estado + selector
  de rango + `refetch()`.

- **`features/admin/components/dashboard/TrafficDashboard.jsx`** (nuevo):
  KPIs (usuarios únicos, páginas vistas), listas de páginas más visitadas,
  fuentes y dispositivos. Selector de rango (24h / 7d / 30d), botón refresh.
  Muestra banner informativo cuando no está configurado.

- **`AdminDashboardTemplate.jsx`**: nueva tab **"Tráfico"** con
  `<TrafficDashboard />`. También se muestra en la parte superior del tab
  "Resumen" para dar visibilidad inmediata.

---

## Historial (sesiones anteriores)

- `mockData` separado en público/privado (passwords fuera del bundle).
- `og-image` (equipo_main.webp) y favicon Creeser en `index.html`.
- `console.*` eliminados en producción vía `vite.config.js` (esbuild drop).
- `apiClient.js` como capa de abstracción mock → futuro backend.
  **Sigue en modo mock — no se tocó en esta sesión.**
- `ErrorBoundary` global en `App.jsx`.
- `React.lazy()` + `Suspense` por sección en `App.jsx`.
- `public/photos/` verificado (48 archivos) contra `imageMap.js`.
- `.env.production` conectado vía `import.meta.env`.
- 8 páginas + 5 services que importaban mockData directamente refactorizados
  a `publicData` / hooks.

---

## Pendiente para próximas sesiones

- 🔜 **Backend real** (Supabase Auth o Express + JWT). Cuando esté:
  - Setear `VITE_API_URL` en `.env.production`.
  - `apiClient.isApiAvailable()` empezará a devolver `true` y los services
    dual-mode empezarán a hacer HTTP.
  - Migrar los 9 services restantes al mismo patrón que `authService.js`.
  - Remover el `ConstructionBanner` de los layouts admin/instructor una
    vez los datos sean productivos.
- 🔜 **CMS admin funcional**. El template `/admin/contenido` existe pero
  guarda en memoria. Necesita:
  - Endpoints `/api/content/*` para persistir cambios.
  - Sistema de upload de imágenes (Vercel Blob / Supabase Storage).
- 🔜 **Ajuste fino de Vercel Analytics API**: los endpoints internos de
  Vercel Web Analytics están en beta y pueden cambiar. Al desplegar,
  validar los path/parámetros contra los datos reales del proyecto y
  ajustar `queryVercelAnalytics()` en `api/traffic-metrics.js` si el
  formato de respuesta difiere.
