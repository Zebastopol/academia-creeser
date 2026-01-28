// Mock data para el Club Deportivo Creeser - Taekwondo

export const clubInfo = {
  name: "Club Deportivo Creeser",
  tagline: "Excelencia en Taekwondo",
  description: "Formando campeones y promoviendo un estilo de vida saludable a través del arte marcial del Taekwondo",
  phone: "+56 9 1234 5678",
  email: "contacto@creeser.cl",
  address: "Av. Principal 123, Santiago, Chile",
  socialMedia: {
    facebook: "https://facebook.com/creeser",
    instagram: "https://instagram.com/creeser",
    twitter: "https://twitter.com/creeser",
    youtube: "https://youtube.com/creeser"
  },
  schedule: {
    weekdays: "Lunes a Viernes: 15:00 - 21:00",
    saturday: "Sábado: 09:00 - 14:00",
    sunday: "Domingo: Cerrado"
  }
};

export const classes = [
  {
    id: 1,
    name: "Taekwondo Infantil",
    description: "Clases especializadas para niños de 5 a 12 años. Desarrollo de disciplina, coordinación y valores.",
    ageGroup: "5-12 años",
    duration: "60 minutos",
    level: "Principiante a Avanzado",
    instructor: "Maestro Juan Pérez",
    schedule: [
      { day: "Lunes", time: "16:00 - 17:00" },
      { day: "Miércoles", time: "16:00 - 17:00" },
      { day: "Viernes", time: "16:00 - 17:00" }
    ],
    maxCapacity: 20,
    currentEnrolled: 15,
    price: 45000,
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80"
  },
  {
    id: 2,
    name: "Taekwondo Juvenil",
    description: "Entrenamiento intensivo para adolescentes. Preparación para competencias y cinturones superiores.",
    ageGroup: "13-17 años",
    duration: "90 minutos",
    level: "Intermedio a Avanzado",
    instructor: "Maestro Juan Pérez",
    schedule: [
      { day: "Martes", time: "17:30 - 19:00" },
      { day: "Jueves", time: "17:30 - 19:00" },
      { day: "Sábado", time: "10:00 - 11:30" }
    ],
    maxCapacity: 15,
    currentEnrolled: 12,
    price: 55000,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
  },
  {
    id: 3,
    name: "Taekwondo Adultos",
    description: "Clases para adultos de todos los niveles. Mejora tu condición física y aprende defensa personal.",
    ageGroup: "18+ años",
    duration: "90 minutos",
    level: "Todos los niveles",
    instructor: "Maestra María González",
    schedule: [
      { day: "Lunes", time: "19:00 - 20:30" },
      { day: "Miércoles", time: "19:00 - 20:30" },
      { day: "Viernes", time: "19:00 - 20:30" }
    ],
    maxCapacity: 20,
    currentEnrolled: 18,
    price: 60000,
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80"
  },
  {
    id: 4,
    name: "Competencia y Alto Rendimiento",
    description: "Entrenamiento especializado para competidores. Preparación física, técnica y mental.",
    ageGroup: "12+ años",
    duration: "120 minutos",
    level: "Avanzado",
    instructor: "Maestro Juan Pérez",
    schedule: [
      { day: "Martes", time: "19:30 - 21:30" },
      { day: "Jueves", time: "19:30 - 21:30" },
      { day: "Sábado", time: "11:30 - 13:30" }
    ],
    maxCapacity: 12,
    currentEnrolled: 10,
    price: 75000,
    image: "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=800&q=80"
  }
];

export const memberships = [
  {
    id: 1,
    name: "Plan Básico",
    price: 45000,
    period: "mensual",
    features: [
      "2 clases por semana",
      "Acceso a instalaciones",
      "Seguro de accidentes",
      "Uniforme incluido (primera vez)",
      "Evaluaciones de cinturón"
    ],
    popular: false,
    color: "primary"
  },
  {
    id: 2,
    name: "Plan Estándar",
    price: 60000,
    period: "mensual",
    features: [
      "3 clases por semana",
      "Acceso a instalaciones",
      "Seguro de accidentes",
      "Uniforme incluido (primera vez)",
      "Evaluaciones de cinturón",
      "Acceso a eventos especiales",
      "Descuento en tienda"
    ],
    popular: true,
    color: "accent"
  },
  {
    id: 3,
    name: "Plan Premium",
    price: 85000,
    period: "mensual",
    features: [
      "Clases ilimitadas",
      "Acceso prioritario a instalaciones",
      "Seguro de accidentes premium",
      "Uniforme incluido (primera vez)",
      "Evaluaciones de cinturón",
      "Acceso a todos los eventos",
      "Entrenamiento personalizado mensual",
      "Descuento 20% en tienda",
      "Acceso a seminarios exclusivos"
    ],
    popular: false,
    color: "gold"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    role: "Padre de alumno",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Mi hijo ha mejorado increíblemente en disciplina y confianza desde que comenzó en Creeser. Los instructores son excepcionales y el ambiente es muy familiar.",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Ana Martínez",
    role: "Alumna adulta",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "Nunca pensé que a mis 35 años comenzaría Taekwondo. El club me ha dado una nueva perspectiva de vida, mejor salud y grandes amigos.",
    date: "2024-02-20"
  },
  {
    id: 3,
    name: "Diego Silva",
    role: "Competidor juvenil",
    image: "https://i.pravatar.cc/150?img=8",
    rating: 5,
    text: "Gracias a Creeser he ganado varios campeonatos nacionales. El entrenamiento es de alto nivel y los maestros realmente se preocupan por tu progreso.",
    date: "2024-03-10"
  },
  {
    id: 4,
    name: "Patricia Gómez",
    role: "Madre de alumna",
    image: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    text: "Mi hija ha encontrado su pasión en el Taekwondo. El club no solo enseña técnicas, sino valores fundamentales para la vida.",
    date: "2024-03-25"
  }
];

export const events = [
  {
    id: 1,
    title: "Seminario de Defensa Personal",
    description: "Aprende técnicas efectivas de defensa personal aplicadas del Taekwondo",
    date: "2024-06-15",
    time: "10:00 - 14:00",
    location: "Instalaciones Creeser",
    instructor: "Maestro Juan Pérez",
    price: 15000,
    capacity: 30,
    registered: 18,
    image: "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=800&q=80",
    category: "Seminario"
  },
  {
    id: 2,
    title: "Charla: Nutrición para Deportistas",
    description: "Nutricionista deportivo comparte consejos para optimizar tu rendimiento",
    date: "2024-06-22",
    time: "18:00 - 20:00",
    location: "Sala de conferencias Creeser",
    instructor: "Dra. Laura Fernández",
    price: 0,
    capacity: 50,
    registered: 32,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    category: "Charla"
  },
  {
    id: 3,
    title: "Campeonato Interno",
    description: "Competencia amistosa entre alumnos del club. Todas las categorías.",
    date: "2024-07-13",
    time: "09:00 - 18:00",
    location: "Gimnasio Principal",
    instructor: "Todos los instructores",
    price: 5000,
    capacity: 100,
    registered: 67,
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80",
    category: "Competencia"
  },
  {
    id: 4,
    title: "Taller de Meditación y Mindfulness",
    description: "Aprende técnicas de meditación para mejorar tu concentración y bienestar",
    date: "2024-07-20",
    time: "11:00 - 13:00",
    location: "Sala de yoga Creeser",
    instructor: "Instructor certificado",
    price: 8000,
    capacity: 25,
    registered: 15,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    category: "Taller"
  }
];

export const instructors = [
  {
    id: 1,
    name: "Maestro Juan Pérez",
    title: "Director Técnico",
    belt: "6° Dan Cinturón Negro",
    specialization: "Competencia y Alto Rendimiento",
    experience: "25 años de experiencia",
    achievements: [
      "Campeón Nacional 2010-2015",
      "Entrenador Selección Nacional",
      "Certificado Internacional WTF"
    ],
    image: "https://i.pravatar.cc/300?img=33",
    bio: "Maestro con más de 25 años dedicados al Taekwondo. Ha formado campeones nacionales e internacionales."
  },
  {
    id: 2,
    name: "Maestra María González",
    title: "Instructora Senior",
    belt: "4° Dan Cinturón Negro",
    specialization: "Taekwondo Infantil y Juvenil",
    experience: "15 años de experiencia",
    achievements: [
      "Especialista en pedagogía deportiva",
      "Campeona Sudamericana 2018",
      "Certificada en psicología deportiva"
    ],
    image: "https://i.pravatar.cc/300?img=44",
    bio: "Apasionada por la enseñanza a niños y jóvenes. Experta en desarrollo de habilidades motrices."
  },
  {
    id: 3,
    name: "Instructor Carlos Muñoz",
    title: "Instructor",
    belt: "3° Dan Cinturón Negro",
    specialization: "Taekwondo Adultos",
    experience: "10 años de experiencia",
    achievements: [
      "Campeón Regional 2020",
      "Certificado en preparación física",
      "Instructor certificado WTF"
    ],
    image: "https://i.pravatar.cc/300?img=15",
    bio: "Enfocado en el desarrollo integral de adultos, combinando técnica, fitness y bienestar."
  }
];

export const gallery = [
  {
    id: 1,
    title: "Entrenamiento Infantil",
    category: "Clases",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80"
  },
  {
    id: 2,
    title: "Competencia Nacional",
    category: "Eventos",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
  },
  {
    id: 3,
    title: "Clase de Adultos",
    category: "Clases",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80"
  },
  {
    id: 4,
    title: "Seminario Técnico",
    category: "Eventos",
    image: "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=800&q=80"
  },
  {
    id: 5,
    title: "Instalaciones",
    category: "Instalaciones",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
  },
  {
    id: 6,
    title: "Entrenamiento de Competencia",
    category: "Clases",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80"
  }
];

export const faqs = [
  {
    id: 1,
    question: "¿Necesito experiencia previa para comenzar?",
    answer: "No, aceptamos alumnos de todos los niveles. Nuestras clases están diseñadas para principiantes y avanzados."
  },
  {
    id: 2,
    question: "¿Qué edad mínima se requiere?",
    answer: "Aceptamos niños desde los 5 años. Tenemos clases especializadas para cada grupo etario."
  },
  {
    id: 3,
    question: "¿Qué debo traer a mi primera clase?",
    answer: "Solo ropa deportiva cómoda. El uniforme (dobok) se incluye con tu membresía."
  },
  {
    id: 4,
    question: "¿Con qué frecuencia son los exámenes de cinturón?",
    answer: "Los exámenes se realizan cada 3-4 meses, dependiendo del progreso individual de cada alumno."
  },
  {
    id: 5,
    question: "¿Ofrecen clases de prueba?",
    answer: "Sí, ofrecemos una clase de prueba gratuita para que conozcas nuestras instalaciones e instructores."
  },
  {
    id: 6,
    question: "¿Puedo cambiar mi plan de membresía?",
    answer: "Sí, puedes cambiar tu plan en cualquier momento. Los cambios se aplican en el siguiente ciclo de facturación."
  }
];

// Mock users para el sistema de autenticación
export const mockUsers = [
  {
    id: 1,
    email: "admin@creeser.cl",
    password: "admin123", // En producción, esto estaría hasheado
    role: "admin",
    name: "Administrador",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    email: "instructor@creeser.cl",
    password: "instructor123",
    role: "instructor",
    name: "Juan Pérez",
    avatar: "https://i.pravatar.cc/150?img=33"
  },
  {
    id: 3,
    email: "socio@creeser.cl",
    password: "socio123",
    role: "member",
    name: "Carlos Rodríguez",
    avatar: "https://i.pravatar.cc/150?img=12",
    membership: "Plan Estándar",
    memberSince: "2023-01-15",
    belt: "Cinturón Azul"
  }
];

// Mock bookings para el sistema de agendamiento
export const mockBookings = [
  {
    id: 1,
    userId: 3,
    classId: 1,
    date: "2024-06-10",
    time: "16:00",
    status: "confirmed"
  },
  {
    id: 2,
    userId: 3,
    classId: 1,
    date: "2024-06-12",
    time: "16:00",
    status: "confirmed"
  }
];
