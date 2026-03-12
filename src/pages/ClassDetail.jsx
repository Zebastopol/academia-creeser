import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { classes, academiaInfo } from '../shared/data/mockData';
import Button from '../shared/components/atoms/Button';
import SEO from '../shared/components/common/SEO';
import { FaClock, FaUsers, FaMapMarkerAlt, FaChevronLeft } from 'react-icons/fa';

const ClassDetail = () => {
  const { id } = useParams();
  const classItem = classes.find(c => c.id === parseInt(id));

  if (!classItem) return <div className="pt-32 text-center text-2xl font-bold">Clase no encontrada</div>;

  return (
    <main className="min-h-screen pb-20">
      <SEO title={classItem.name} description={classItem.description} />
      
      {/* Hero Header */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={classItem.image} 
          alt={classItem.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/20 to-transparent" />
        
        <div className="absolute top-24 left-0 right-0">
          <div className="container-custom">
            <Link to="/" className="inline-flex items-center text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/50 transition-all mb-8">
              <FaChevronLeft className="mr-2" /> Volver al Inicio
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 py-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="px-4 py-1 bg-dynamic-main text-white rounded-full text-sm font-bold mb-4 inline-block">
                {classItem.ageGroup}
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-black text-black">
                {classItem.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sobre esta clase</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {classItem.description}
              </p>
              
              <div className="mt-8 bg-dynamic-light/30 p-6 rounded-creeser border border-dynamic-main/10">
                <h3 className="text-xl font-bold text-dynamic-dark mb-2">Nuestra Metodología</h3>
                <p className="text-dynamic-dark/80 italic">
                  "{classItem.methodology}"
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">Horarios Disponibles</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {classItem.schedules.map((schedule, idx) => (
                  <div key={idx} className="flex items-center p-4 bg-white rounded-creeser border border-gray-100 shadow-soft">
                    <div className="w-12 h-12 rounded-full bg-dynamic-main/10 text-dynamic-main flex items-center justify-center mr-4">
                      <FaClock />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{schedule.day} • {schedule.time}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FaMapMarkerAlt className="mr-1" /> Sede {schedule.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / CTA */}
          <aside className="space-y-6">
            <div className="bg-white p-8 rounded-creeser border border-gray-100 shadow-soft sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Inscríbete</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-3 text-dynamic-main" />
                  <span>Todos los niveles</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-3 text-dynamic-main" />
                  <span>Clases de alto impacto</span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg mb-8">
                <p className="text-sm text-gray-500">Desde</p>
                <p className="text-3xl font-bold text-dynamic-main">$30.000 <span className="text-sm font-normal text-gray-400">/ mes</span></p>
              </div>

              <Button to="/registro" className="w-full py-4 bg-dynamic-main hover:bg-dynamic-dark text-white text-lg">
                Reservar Cupo
              </Button>
              
              <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
                Matrícula anual de $12.000 no incluida. <br/>
                Consulta por descuentos familiares (20%).
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ClassDetail;
