import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { faqs } from '../shared/data/mockData';
import SEO from '../shared/components/common/SEO';
import Button from '../shared/components/atoms/Button';

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const cats = [...new Set(faqs.map(f => f.category))];
    return ['Todas', ...cats];
  }, []);

  const filteredFaqs = useMemo(() => {
    let result = faqs;
    if (activeCategory !== 'Todas') {
      result = result.filter(f => f.category === activeCategory);
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        f => f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term)
      );
    }
    return result;
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen">
      <SEO
        title="Preguntas Frecuentes"
        description="Resuelve tus dudas sobre clases, horarios, precios, equipamiento y más de la Academia Creeser."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-900 via-primary-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gold-400 rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary-400 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-4"
          >
            Preguntas Frecuentes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto"
          >
            Encuentra respuestas a las dudas más comunes sobre la academia.
          </motion.p>
        </div>
      </section>

      {/* Buscador + Filtros + Acordeón */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          {/* Buscador */}
          <div className="relative mb-8">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar una pregunta..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          {/* Categorías */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenId(null); }}
                className={`
                  px-4 py-2
                  text-sm font-semibold
                  rounded-full border transition-all duration-300
                  ${activeCategory === cat
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Acordeón */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron preguntas para tu búsqueda.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="flex items-center justify-between w-full p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="pr-4">
                      <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">
                        {faq.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mt-1">{faq.question}</h3>
                    </div>
                    <FaChevronDown
                      className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${openId === faq.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Escríbenos directamente y te responderemos lo antes posible.
          </p>
          <Button to="/contacto" variant="primary" size="lg">
            Ir a Contacto
          </Button>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
