/**
 * Definición de secciones editables del CMS.
 * Cada sección mapea a datos en publicData.js.
 * Cuando exista backend, estos datos se cargarán y guardarán vía API.
 */
export const CMS_SECTIONS = [
  {
    id: 'hero',
    name: 'Hero Principal',
    description: 'Banner principal de la página de inicio',
    page: 'home',
    fields: [
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'description', label: 'Descripción', type: 'textarea' },
      { key: 'heroImage', label: 'Imagen de fondo', type: 'image' },
    ],
  },
  {
    id: 'about-mission',
    name: 'Misión y Visión',
    description: 'Sección de misión y visión en Nosotros',
    page: 'nosotros',
    fields: [
      { key: 'mission', label: 'Misión', type: 'textarea' },
      { key: 'vision', label: 'Visión', type: 'textarea' },
    ],
  },
  {
    id: 'contact-info',
    name: 'Información de Contacto',
    description: 'Datos de contacto mostrados en el footer y página de contacto',
    page: 'global',
    fields: [
      { key: 'phone', label: 'Teléfono', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'instagram', label: 'Instagram', type: 'text' },
      { key: 'availability', label: 'Horario de atención', type: 'text' },
    ],
  },
  {
    id: 'locations',
    name: 'Sedes',
    description: 'Ubicaciones de las sedes de la academia',
    page: 'global',
    fields: [
      { key: 'sede1Name', label: 'Sede 1 - Nombre', type: 'text' },
      { key: 'sede1Address', label: 'Sede 1 - Dirección', type: 'text' },
      { key: 'sede2Name', label: 'Sede 2 - Nombre', type: 'text' },
      { key: 'sede2Address', label: 'Sede 2 - Dirección', type: 'text' },
    ],
  },
  {
    id: 'instructor',
    name: 'Profesor Principal',
    description: 'Datos del instructor mostrados en la página de Nosotros',
    page: 'nosotros',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text' },
      { key: 'role', label: 'Rol', type: 'text' },
      { key: 'rank', label: 'Grado', type: 'text' },
      { key: 'experience', label: 'Experiencia', type: 'text' },
      { key: 'specialty', label: 'Especialidad', type: 'text' },
      { key: 'image', label: 'Foto del instructor', type: 'image' },
    ],
  },
  {
    id: 'memberships',
    name: 'Planes y Precios',
    description: 'Información de membresías y precios',
    page: 'membresias',
    fields: [
      { key: 'plan1Name', label: 'Plan 1 - Nombre', type: 'text' },
      { key: 'plan1Price', label: 'Plan 1 - Precio', type: 'text' },
      { key: 'plan2Name', label: 'Plan 2 - Nombre', type: 'text' },
      { key: 'plan2Price', label: 'Plan 2 - Precio', type: 'text' },
    ],
  },
]

/**
 * Transforma los datos de publicData al formato plano que usa el CMS.
 */
export const flattenPublicData = (academiaInfo, instructor) => ({
  tagline: academiaInfo.tagline,
  description: academiaInfo.description,
  mission: academiaInfo.mission,
  vision: academiaInfo.vision,
  phone: academiaInfo.contact.phone,
  email: academiaInfo.contact.email,
  instagram: academiaInfo.contact.instagram,
  availability: academiaInfo.contact.availability,
  sede1Name: academiaInfo.locations[0]?.name || '',
  sede1Address: academiaInfo.locations[0]?.address || '',
  sede2Name: academiaInfo.locations[1]?.name || '',
  sede2Address: academiaInfo.locations[1]?.address || '',
  name: instructor.name,
  role: instructor.role,
  rank: instructor.rank,
  experience: instructor.experience,
  specialty: instructor.specialty,
  image: instructor.image,
})
