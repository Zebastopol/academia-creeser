import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTimes } from 'react-icons/fa';

/**
 * @param {{ value: string, onChange: function, placeholder?: string, debounceMs?: number }} props
 */
const SearchInput = ({ value, onChange, placeholder = 'Buscar...', debounceMs = 300 }) => {
  const [internal, setInternal] = useState(value);

  useEffect(() => { setInternal(value); }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (internal !== value) onChange(internal);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [internal, debounceMs, onChange, value]);

  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={internal}
        onChange={(e) => setInternal(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
      {internal && (
        <button
          onClick={() => { setInternal(''); onChange(''); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={12} />
        </button>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  debounceMs: PropTypes.number,
};

export default SearchInput;
