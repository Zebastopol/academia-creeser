import { useState, useMemo } from 'react'
import { FaEdit, FaSearch, FaInfoCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SectionEditor from '../components/content/SectionEditor'
import { CMS_SECTIONS, flattenPublicData } from '../constants/contentConstants'
import { academiaInfo, instructor } from '../../../shared/data/publicData'

const PAGE_FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'home', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'membresias', label: 'Membresías' },
  { id: 'global', label: 'Global' },
]

/**
 * Template del CMS de administración.
 * Permite al admin editar textos e imágenes de las secciones públicas.
 */
const AdminContentTemplate = () => {
  const [filterPage, setFilterPage] = useState('all')
  const [search, setSearch] = useState('')

  const flatData = useMemo(() => flattenPublicData(academiaInfo, instructor), [])

  const enrichedSections = useMemo(() =>
    CMS_SECTIONS.map(section => ({
      ...section,
      ...Object.fromEntries(
        section.fields.map(f => [f.key, flatData[f.key] || ''])
      ),
    })),
    [flatData]
  )

  const filteredSections = useMemo(() =>
    enrichedSections.filter(s => {
      if (filterPage !== 'all' && s.page !== filterPage) return false
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    }),
    [enrichedSections, filterPage, search]
  )

  const handleSave = async (sectionId, data) => {
    await new Promise(r => setTimeout(r, 500))
    toast.info(
      `Cambios guardados localmente para "${data.name || sectionId}". Para persistir cambios se necesita backend.`,
      { autoClose: 4000 }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <FaEdit className="text-primary" />
            Gestión de Contenido
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Edita los textos e imágenes de las secciones públicas del sitio
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 text-sm text-amber-800 bg-amber-50 rounded-xl border border-amber-200">
        <FaInfoCircle className="flex-shrink-0" />
        <p>
          <strong>Modo local:</strong> Los cambios se guardan temporalmente en el navegador.
          Para persistir cambios permanentemente se requiere conexión a backend (Supabase / API REST).
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Buscar sección..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto">
          {PAGE_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilterPage(f.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                filterPage === f.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredSections.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            No se encontraron secciones con ese filtro.
          </div>
        ) : (
          filteredSections.map(section => (
            <SectionEditor
              key={section.id}
              section={section}
              onSave={handleSave}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default AdminContentTemplate
