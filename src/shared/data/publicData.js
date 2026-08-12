/**
 * Datos públicos del sitio -- seguros para incluir en el bundle de producción.
 * NO contiene passwords, datos de usuario ni información sensible.
 */
import { images } from '../../data/imageMap'

export const academiaInfo = {
  name: "Academia Creeser",
  clubName: "Academia Taekwondo Creeser",
  tagline: "Deporte con sentido",
  description: "Utilizamos la metodología comprensiva para crear un espacio donde 'Creer, Crecer y Ser' sean una realidad.",
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
    facebookUrl: "https://www.facebook.com/p/Espacio-Creeser-100086943102222/",
    availability: "Lun a Vie 09:00 - 18:00"
  },
  locations: [
    { name: "La Reina", address: "Palmas de Mallorca 673" },
    { name: "Ñuñoa", address: "Tegualda 1566" }
  ]
}

export const classes = [
  {
    id: 1,
    name: "Baby Taekwondo",
    ageGroup: "3 - 5 años",
    instructorId: 3,
    description: "Combina desarrollo motor y aprendizaje significativo mediante circuitos y retos cognitivos que fomentan la autonomía y el respeto.",
    methodology: "Metodología comprensiva y aprendizaje situado.",
    image: images.classes.babyTkd,
    schedules: [
      { location: "Ñuñoa", day: "Lunes", time: "17:00 a 17:40" }
    ],
    price: 30000
  },
  {
    id: 2,
    name: "Kids",
    ageGroup: "5 - 8 años",
    instructorId: 3,
    description: "La disciplina como eje central a través de juegos que fomentan la interacción social, el pensamiento crítico y la autogestión.",
    methodology: "Aprendizaje por indagación.",
    image: images.classes.kids,
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
    instructorId: 3,
    description: "Excelencia técnico-táctica y toma de decisiones. Sustituimos el juego por el rigor formativo en un entorno de pertenencia y amistad.",
    methodology: "Metodología comprensiva técnica-táctica.",
    image: images.classes.cadetes,
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
    instructorId: 3,
    description: "Catalizador de bienestar y salud mental. Diseñado para liberar el estrés laboral/académico mediante esfuerzo consciente y trabajo en equipo.",
    methodology: "Aprendizaje colaborativo y resiliencia.",
    image: images.classes.adultos,
    schedules: [
      { location: "La Reina", day: "Martes", time: "19:40 a 20:40" },
      { location: "La Reina", day: "Jueves", time: "19:40 a 20:40" }
    ],
    price: 35000
  }
]

export const memberships = [
  {
    id: 1,
    name: "1 vez x Semana",
    price: 30000,
    promoPrice: 25000,
    promoNote: "pagando antes del 5 de cada mes",
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
    promoNote: "pagando antes del 5 de cada mes",
    period: "mensual",
    features: [
      "8 clases al mes",
      "Metodología comprensiva",
      "Descuento familiar 20%",
      "Seguimiento de progreso"
    ],
    popular: true
  }
]

export const testimonials = [
  {
    id: 1,
    name: "Carolina Paz",
    role: "Apoderada",
    image: images.testimonials.carolina,
    rating: 5,
    text: "Academia Creeser ha sido fundamental en el desarrollo de la confianza de mi hijo. Los valores que enseñan se ven reflejados en casa.",
    date: "2024-02-15"
  },
  {
    id: 2,
    name: "Roberto Méndez",
    role: "Alumno Adultos",
    image: images.testimonials.roberto,
    rating: 5,
    text: "Excelente ambiente para liberar el estrés después del trabajo. El profesor Rodrigo tiene una metodología muy cercana y efectiva.",
    date: "2024-03-01"
  }
]

export const events = [
  {
    id: 1,
    title: "Aniversario Academia Creeser",
    description: "Nuestra gran fiesta anual para celebrar un año más de crecimiento y comunidad.",
    date: "2026-06-15",
    time: "10:00 - 18:00",
    location: "Sede La Reina",
    category: "Celebración",
    image: images.events.aniversario,
  },
  {
    id: 2,
    title: "Trekking en el Bosque",
    description: "Jornada de trekking en el Parque Metropolitano de Santiago.",
    date: "2026-07-20",
    time: "09:00 - 14:00",
    location: "Sede Ñuñoa",
    category: "Encuentro",
    image: images.events.trekking,
  },
  {
    id: 3,
    title: "Campamento de Verano Cadetes y Juveniles",
    description: "Campamento de verano para cadetes y juveniles.",
    date: "2026-08-10",
    time: "08:00 - 18:00",
    location: "Polideportivo Municipal La Reina",
    category: "Extracurricular",
    image: images.events.campamento,
  },
  {
    id: 4,
    title: "Campeonato Enegros",
    description: "Campeonato regional de Taekwondo organizado por la Federación Chilena de Taekwondo.",
    date: "2026-09-05",
    time: "10:00 - 14:00",
    location: "Sede La Reina",
    category: "Seminario",
    image: images.events.campeonato,
  }
]

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
  image: images.instructor.rodrigo
}

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
]
