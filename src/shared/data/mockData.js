// Datos Oficiales - Academia Creeser

export const academiaInfo = {
  name: "Academia Creeser",
  clubName: "Club Deportivo Creeser",
  tagline: "Deporte con sentido",
  description: "Creeser surge tras la pregunta de cómo ayudar a nuestro hijo a navegar en un mundo tan rápido y cambiante con seguridad y confianza. Utilizamos la metodología comprensiva para crear un espacio donde 'Creer, Crecer y Ser' sean una realidad.",
  mission: "Llegar a la mayor cantidad de personas posibles e impactar en ellas de forma positiva, convirtiéndonos en aliados durante el desarrollo de tus hijos/as.",
  vision: "Soñamos con tener un gran centro profesional y moderno en donde podamos abarcar varios deportes, siendo un punto de encuentro donde el deporte sea el motor de cambio.",
  values: [
    { name: "Cortesía", description: "Respeto a los demás" },
    { name: "Integridad", description: "Actuar bien aunque nadie esté mirando" },
    { name: "Perseverancia", description: "No rendirse con la tarea difícil" },
    { name: "Autocontrol", description: "Manejar las propias emociones" },
    { name: "Espíritu Indomable", description: "Valentía para defender sus ideales" }
  ],
  contact: {
    phone: "+56 9 8221 1715",
    email: "espaciocreeser.contacto@gmail.com",
    instagram: "@creesertkd",
    instagramUrl: "https://www.instagram.com/creesertkd/",
    availability: "Lun a Vie 09:00 - 18:00"
  },
  locations: [
    { name: "La Reina", address: "Palmas de Mallorca 673" },
    { name: "Ñuñoa", address: "Tegualda 1566" }
  ]
};

export const classes = [
  {
    id: 1,
    name: "Baby Taekwondo",
    ageGroup: "3 - 5 años",
    description: "Combina desarrollo motor y aprendizaje significativo mediante circuitos y retos cognitivos que fomentan la autonomía y el respeto.",
    methodology: "Metodología comprensiva y aprendizaje situado.",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80",
    schedules: [
      { location: "Ñuñoa", day: "Lunes", time: "17:00 a 17:40" }
    ],
    price: 30000
  },
  {
    id: 2,
    name: "Kids",
    ageGroup: "5 - 8 años",
    description: "La disciplina como eje central a través de juegos que fomentan la interacción social, el pensamiento crítico y la autogestión.",
    methodology: "Aprendizaje por indagación.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    schedules: [
      { location: "La Reina", day: "Martes", time: "17:30 a 18:40" },
      { location: "La Reina", day: "Jueves", time: "17:30 a 18:40" }
    ],
    price: 35000
  },
  {
    id: 3,
    name: "Cadetes",
    ageGroup: "8 - 14 años",
    description: "Excelencia técnico-táctica y toma de decisiones. Sustituimos el juego por el rigor formativo en un entorno de pertenencia y amistad.",
    methodology: "Metodología comprensiva técnica-táctica.",
    image: "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=800&q=80",
    schedules: [
      { location: "Ñuñoa", day: "Lunes", time: "18:00 a 19:00" },
      { location: "Ñuñoa", day: "Miércoles", time: "18:00 a 19:00" },
      { location: "La Reina", day: "Martes", time: "18:40 a 19:40" },
      { location: "La Reina", day: "Jueves", time: "18:40 a 19:40" }
    ],
    price: 35000
  },
  {
    id: 4,
    name: "Adultos",
    ageGroup: "15+ años",
    description: "Catalizador de bienestar y salud mental. Diseñado para liberar el estrés laboral/académico mediante esfuerzo consciente y trabajo en equipo.",
    methodology: "Aprendizaje colaborativo y resiliencia.",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80",
    schedules: [
      { location: "La Reina", day: "Martes", time: "19:40 a 20:40" },
      { location: "La Reina", day: "Jueves", time: "19:40 a 20:40" }
    ],
    price: 35000
  }
];

export const memberships = [
  {
    id: 1,
    name: "1 vez x Semana",
    price: 30000,
    period: "mensual",
    features: [
      "4 clases al mes",
      "Metodología comprensiva",
      "Acceso a eventos internos",
      "Descuento familiar 20%"
    ],
    popular: false
  },
  {
    id: 2,
    name: "2 veces x Semana",
    price: 40000,
    promoPrice: 35000,
    period: "mensual",
    features: [
      "8 clases al mes",
      "Precio especial hasta el día 5",
      "Metodología comprensiva",
      "Descuento familiar 20%",
      "Seguimiento de progreso"
    ],
    popular: true
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Carolina Paz",
    role: "Apoderada",
    image: "https://i.pravatar.cc/150?img=20",
    rating: 5,
    text: "Academia Creeser ha sido fundamental en el desarrollo de la confianza de mi hijo. Los valores que enseñan se ven reflejados en casa.",
    date: "2024-02-15"
  },
  {
    id: 2,
    name: "Roberto Méndez",
    role: "Alumno Adultos",
    image: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    text: "Excelente ambiente para liberar el estrés después del trabajo. El profesor Rodrigo tiene una metodología muy cercana y efectiva.",
    date: "2024-03-01"
  }
];

export const events = [
  {
    id: 1,
    title: "Aniversario Academia Creeser",
    description: "Nuestra gran fiesta anual para celebrar un año más de crecimiento y comunidad.",
    date: "2024-04-15",
    time: "10:00 - 18:00",
    location: "Sede La Reina",
    category: "Celebración",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80"
  },
  {
    id: 2,
    title: "Encuentro Inter-Academias",
    description: "Jornada de práctica y camaradería con alumnos de otras escuelas de Taekwondo.",
    date: "2024-05-20",
    time: "09:00 - 14:00",
    location: "Sede Ñuñoa",
    category: "Encuentro",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80"
  }
];

export const instructor = {
  name: "Rodrigo Gutiérrez Fernandes",
  role: "Profesor Principal",
  rank: "Cinturón Negro 3er Dan",
  experience: "8 años",
  specialty: "Taekwondo WT y Metodología Comprensiva",
  background: [
    "Preparador Físico",
    "Pedagogía en Educación Física",
    "Ex competidor nacional e internacional",
    "Formación técnica en México"
  ],
  image: "https://i.pravatar.cc/300?img=33"
};

export const mockUsers = [
  {
    id: 1,
    email: "admin@creeser.cl",
    password: "admin123",
    role: "admin",
    name: "Administrador",
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "+56 9 8221 1715",
    birthDate: "1985-03-10",
    emergencyContact: { name: "Soporte Creeser", phone: "+56 9 8221 1715" },
    joinDate: "2023-01-01",
  },
  {
    id: 2,
    email: "alumno@creeser.cl",
    password: "alumno123",
    role: "member",
    name: "Ignacio Silva",
    avatar: "https://i.pravatar.cc/150?img=11",
    belt: "Cinturón Azul",
    membership: "2 veces por semana",
    phone: "+56 9 1234 5678",
    birthDate: "2010-07-22",
    emergencyContact: { name: "María Silva", phone: "+56 9 8765 4321" },
    joinDate: "2025-03-15",
  }
];

export const faqs = [
  {
    id: 1,
    category: "General",
    question: "¿Qué es la Academia Creeser?",
    answer: "Academia Creeser es un club deportivo especializado en Taekwondo que utiliza la metodología comprensiva para desarrollar habilidades físicas, emocionales y sociales. Nuestro lema es 'Creer, Crecer y Ser'."
  },
  {
    id: 2,
    category: "General",
    question: "¿Desde qué edad pueden ingresar los niños?",
    answer: "Recibimos niños desde los 3 años en nuestro programa Baby Taekwondo. Tenemos programas adaptados para cada rango etario: Baby (3-5), Kids (5-8), Cadetes (8-14) y Adultos (15+)."
  },
  {
    id: 3,
    category: "General",
    question: "¿Necesito experiencia previa en artes marciales?",
    answer: "No, todos nuestros programas están diseñados para recibir principiantes. Nuestros instructores adaptan las clases para que cada alumno avance a su propio ritmo."
  },
  {
    id: 4,
    category: "Horarios y Sedes",
    question: "¿Dónde se ubican las sedes?",
    answer: "Contamos con dos sedes: La Reina (Palmas de Mallorca 673) y Ñuñoa (Tegualda 1566). Cada sede tiene horarios específicos según el programa."
  },
  {
    id: 5,
    category: "Horarios y Sedes",
    question: "¿Cuáles son los horarios de clase?",
    answer: "Los horarios varían según el programa y la sede. Baby Taekwondo: Lunes 17:00-17:40 (Ñuñoa). Kids: Martes y Jueves 17:30-18:40 (La Reina). Cadetes: Lunes y Miércoles 18:00-19:00 (Ñuñoa), Martes y Jueves 18:40-19:40 (La Reina). Adultos: Martes y Jueves 19:40-20:40 (La Reina)."
  },
  {
    id: 6,
    category: "Precios y Pagos",
    question: "¿Cuánto cuesta la mensualidad?",
    answer: "El plan de 1 vez por semana tiene un valor de $30.000 mensuales. El plan de 2 veces por semana cuesta $40.000, con precio promocional de $35.000 si pagas antes del día 5 de cada mes."
  },
  {
    id: 7,
    category: "Precios y Pagos",
    question: "¿Existe matrícula o costo de inscripción?",
    answer: "Sí, la matrícula anual tiene un valor de $12.000. Es un pago único que cubre el año completo."
  },
  {
    id: 8,
    category: "Precios y Pagos",
    question: "¿Hay descuentos familiares?",
    answer: "Sí, ofrecemos un 20% de descuento familiar cuando se inscriben dos o más integrantes del mismo grupo familiar."
  },
  {
    id: 9,
    category: "Equipamiento",
    question: "¿Qué necesito para empezar?",
    answer: "Para las primeras clases solo necesitas ropa deportiva cómoda. El dobok (uniforme de Taekwondo) se puede adquirir una vez que el alumno decida continuar con las clases."
  },
  {
    id: 10,
    category: "Equipamiento",
    question: "¿Dónde puedo comprar el dobok y las protecciones?",
    answer: "La academia puede orientarte sobre dónde adquirir el equipamiento necesario. Consulta directamente con el profesor Rodrigo para recomendaciones."
  },
  {
    id: 11,
    category: "Clases",
    question: "¿Puedo tomar una clase de prueba?",
    answer: "¡Por supuesto! Ofrecemos una clase de prueba gratuita para que conozcas nuestra metodología y el ambiente de la academia. Contáctanos para coordinar tu visita."
  },
  {
    id: 12,
    category: "Clases",
    question: "¿Qué pasa si mi hijo no se adapta?",
    answer: "Nuestro enfoque comprensivo está diseñado para que cada niño encuentre su ritmo. El profesor Rodrigo trabaja de forma personalizada con cada alumno. Si después del primer mes no se adapta, evaluamos juntos las opciones."
  }
];

export const mockBookings = [
  { id: 1,  userId: 2, classId: 3, date: "2025-04-01", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-03-28T10:00:00Z" },
  { id: 2,  userId: 2, classId: 3, date: "2025-04-03", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-03-28T10:01:00Z" },
  { id: 3,  userId: 2, classId: 3, date: "2025-04-08", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-04-05T09:00:00Z" },
  { id: 4,  userId: 2, classId: 3, date: "2025-04-10", time: "18:40 a 19:40", location: "La Reina", status: "cancelled", createdAt: "2025-04-05T09:01:00Z" },
  { id: 5,  userId: 2, classId: 3, date: "2025-04-15", time: "18:00 a 19:00", location: "Ñuñoa",    status: "confirmed", createdAt: "2025-04-12T11:00:00Z" },
  { id: 6,  userId: 2, classId: 3, date: "2025-04-17", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-04-12T11:01:00Z" },
  { id: 7,  userId: 2, classId: 3, date: "2025-04-22", time: "18:00 a 19:00", location: "Ñuñoa",    status: "confirmed", createdAt: "2025-04-19T10:00:00Z" },
  { id: 8,  userId: 2, classId: 3, date: "2025-04-24", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-04-19T10:01:00Z" },
  { id: 9,  userId: 2, classId: 4, date: "2025-05-06", time: "19:40 a 20:40", location: "La Reina", status: "confirmed", createdAt: "2025-05-03T08:00:00Z" },
  { id: 10, userId: 2, classId: 4, date: "2025-05-08", time: "19:40 a 20:40", location: "La Reina", status: "cancelled", createdAt: "2025-05-03T08:01:00Z" },
  { id: 11, userId: 2, classId: 3, date: "2025-05-13", time: "18:00 a 19:00", location: "Ñuñoa",    status: "confirmed", createdAt: "2025-05-10T09:00:00Z" },
  { id: 12, userId: 2, classId: 3, date: "2025-05-15", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-05-10T09:01:00Z" },
  { id: 13, userId: 2, classId: 3, date: "2025-05-20", time: "18:00 a 19:00", location: "Ñuñoa",    status: "confirmed", createdAt: "2025-05-17T10:00:00Z" },
  { id: 14, userId: 2, classId: 3, date: "2025-05-22", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-05-17T10:01:00Z" },
  { id: 15, userId: 2, classId: 4, date: "2025-06-03", time: "19:40 a 20:40", location: "La Reina", status: "confirmed", createdAt: "2025-05-31T09:00:00Z" },
  { id: 16, userId: 2, classId: 3, date: "2025-06-10", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-06-07T10:00:00Z" },
  { id: 17, userId: 2, classId: 3, date: "2025-06-12", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-06-07T10:01:00Z" },
  { id: 18, userId: 2, classId: 3, date: "2025-06-17", time: "18:00 a 19:00", location: "Ñuñoa",    status: "cancelled", createdAt: "2025-06-14T09:00:00Z" },
  { id: 19, userId: 2, classId: 3, date: "2025-07-01", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-06-28T11:00:00Z" },
  { id: 20, userId: 2, classId: 3, date: "2025-07-03", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-06-28T11:01:00Z" },
  { id: 21, userId: 2, classId: 4, date: "2025-07-08", time: "19:40 a 20:40", location: "La Reina", status: "confirmed", createdAt: "2025-07-05T09:00:00Z" },
  { id: 22, userId: 2, classId: 3, date: "2025-07-15", time: "18:00 a 19:00", location: "Ñuñoa",    status: "confirmed", createdAt: "2025-07-12T10:00:00Z" },
  { id: 23, userId: 2, classId: 3, date: "2025-07-17", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-07-12T10:01:00Z" },
  { id: 24, userId: 2, classId: 3, date: "2025-08-05", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-08-02T09:00:00Z" },
  { id: 25, userId: 2, classId: 3, date: "2025-08-07", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-08-02T09:01:00Z" },
  { id: 26, userId: 2, classId: 3, date: "2025-08-12", time: "18:00 a 19:00", location: "Ñuñoa",    status: "confirmed", createdAt: "2025-08-09T10:00:00Z" },
  { id: 27, userId: 2, classId: 4, date: "2025-08-14", time: "19:40 a 20:40", location: "La Reina", status: "cancelled", createdAt: "2025-08-09T10:01:00Z" },
  { id: 28, userId: 2, classId: 3, date: "2025-09-02", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-08-30T09:00:00Z" },
  { id: 29, userId: 2, classId: 3, date: "2025-09-04", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-08-30T09:01:00Z" },
  { id: 30, userId: 2, classId: 3, date: "2025-09-09", time: "18:00 a 19:00", location: "Ñuñoa",    status: "confirmed", createdAt: "2025-09-06T10:00:00Z" },
  { id: 31, userId: 2, classId: 3, date: "2025-10-07", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-10-04T09:00:00Z" },
  { id: 32, userId: 2, classId: 3, date: "2025-10-09", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-10-04T09:01:00Z" },
  { id: 33, userId: 2, classId: 3, date: "2025-11-04", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-11-01T09:00:00Z" },
  { id: 34, userId: 2, classId: 3, date: "2025-11-06", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-11-01T09:01:00Z" },
  { id: 35, userId: 2, classId: 3, date: "2025-12-02", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2025-11-29T09:00:00Z" },
  { id: 36, userId: 2, classId: 3, date: "2026-01-06", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2026-01-03T09:00:00Z" },
  { id: 37, userId: 2, classId: 3, date: "2026-01-08", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2026-01-03T09:01:00Z" },
  { id: 38, userId: 2, classId: 3, date: "2026-02-03", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2026-01-31T09:00:00Z" },
  { id: 39, userId: 2, classId: 3, date: "2026-02-05", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2026-01-31T09:01:00Z" },
  { id: 40, userId: 2, classId: 3, date: "2026-03-03", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2026-02-28T09:00:00Z" },
  { id: 41, userId: 2, classId: 3, date: "2026-03-05", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2026-02-28T09:01:00Z" },
  { id: 42, userId: 2, classId: 3, date: "2026-03-10", time: "18:00 a 19:00", location: "Ñuñoa",    status: "confirmed", createdAt: "2026-03-07T10:00:00Z" },
  { id: 43, userId: 2, classId: 3, date: "2026-03-17", time: "18:00 a 19:00", location: "Ñuñoa",    status: "confirmed", createdAt: "2026-03-14T10:00:00Z" },
  { id: 44, userId: 2, classId: 4, date: "2026-03-25", time: "19:40 a 20:40", location: "La Reina", status: "confirmed", createdAt: "2026-03-22T09:00:00Z" },
  { id: 45, userId: 2, classId: 3, date: "2026-03-27", time: "18:40 a 19:40", location: "La Reina", status: "confirmed", createdAt: "2026-03-22T09:01:00Z" },
];
