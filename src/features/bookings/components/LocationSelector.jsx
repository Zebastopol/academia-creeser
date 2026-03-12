import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { academiaInfo } from '../../../shared/data/mockData';
import { cn } from '../../../shared/utils/cn';

const LocationSelector = ({ selectedLocation, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
      {academiaInfo.locations.map((loc) => (
        <button
          key={loc.name}
          onClick={() => onSelect(loc.name)}
          className={cn(
            "relative p-6 rounded-creeser border-2 text-left transition-all duration-300",
            selectedLocation === loc.name 
              ? "border-dynamic-main bg-dynamic-main/5 shadow-md shadow-dynamic-main/10" 
              : "border-gray-100 bg-white hover:border-gray-200"
          )}
        >
          <div className="flex justify-between items-start">
            <div className={cn(
              "p-3 rounded-lg mb-4 inline-block",
              selectedLocation === loc.name ? "bg-dynamic-main text-white" : "bg-gray-100 text-gray-400"
            )}>
              <FaMapMarkerAlt size={20} />
            </div>
            {selectedLocation === loc.name && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <FaCheckCircle className="text-dynamic-main text-xl" />
              </motion.div>
            )}
          </div>
          <h3 className={cn(
            "font-bold text-xl mb-1",
            selectedLocation === loc.name ? "text-dynamic-dark" : "text-gray-900"
          )}>
            Sede {loc.name}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {loc.address}
          </p>
        </button>
      ))}
    </div>
  );
};

export default LocationSelector;
