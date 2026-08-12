import { useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEdit, FaSave, FaTimes, FaImage, FaChevronDown, FaChevronUp } from 'react-icons/fa'

/**
 * Editor de sección individual del CMS.
 * Permite editar textos e imágenes de cada sección de la página pública.
 *
 * @param {{ section: object, onSave: function }} props
 */
const SectionEditor = ({ section, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [formData, setFormData] = useState({ ...section })
  const [saving, setSaving] = useState(false)

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(section.id, formData)
      setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({ ...section })
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-primary rounded-lg">
            {section.name?.charAt(0) || 'S'}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{section.name}</h3>
            <p className="text-xs text-gray-500">{section.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${section.page === 'home' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-600'}`}>
            {section.page}
          </span>
          {isExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 space-y-4 border-t border-gray-100 pt-4">
              {section.fields?.map((field) => (
                <div key={field.key}>
                  <label className="block mb-1 text-xs font-medium text-gray-600">
                    {field.label}
                  </label>
                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={formData[field.key] || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 disabled:opacity-60 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  )}
                  {field.type === 'textarea' && (
                    <textarea
                      value={formData[field.key] || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 disabled:opacity-60 focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
                    />
                  )}
                  {field.type === 'image' && (
                    <div className="flex items-center gap-3">
                      {formData[field.key] && (
                        <img
                          src={formData[field.key]}
                          alt={field.label}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      )}
                      <button
                        disabled={!isEditing}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
                      >
                        <FaImage size={12} />
                        Cambiar imagen
                      </button>
                      <p className="text-xs text-gray-400">
                        Requiere backend para subir imágenes
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <FaTimes size={12} />
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-dark disabled:opacity-50"
                    >
                      <FaSave size={12} />
                      {saving ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                  >
                    <FaEdit size={12} />
                    Editar sección
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

SectionEditor.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    page: PropTypes.string,
    fields: PropTypes.array,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
}

export default SectionEditor
