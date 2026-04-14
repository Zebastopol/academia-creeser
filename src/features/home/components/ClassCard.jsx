import { Link } from 'react-router-dom'

/**
 * @param {{ classItem: object }} props
 */
const ClassCard = ({ classItem }) => {
  return (
    <Link
      to={`/clases/${classItem.id}`}
      className="group relative block h-80 rounded-2xl overflow-hidden"
    >
      {/* Image */}
      <img
        src={classItem.image}
        alt={classItem.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        width={400}
        height={320}
        loading="lazy"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, oklch(0.1 0.05 305 / 0.9) 0%, transparent 60%)',
        }}
      />

      {/* Always visible: name + badge */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <span
          className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full"
          style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
        >
          {classItem.ageGroup}
        </span>
        <h3
          className="font-bold mb-1"
          style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}
        >
          {classItem.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {classItem.duration}
          </span>
          <span
            className="font-display font-black"
            style={{ fontSize: 'var(--text-xl)', color: 'var(--color-accent)' }}
          >
            ${classItem.price?.toLocaleString()}
          </span>
        </div>

        {/* Hover reveal: description + CTA */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500 ease-out">
          <p className="text-sm mt-3 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
            {classItem.description}
          </p>
          <span
            className="inline-block mt-3 text-sm font-semibold"
            style={{ color: 'var(--color-accent)' }}
          >
            Ver horarios →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ClassCard
