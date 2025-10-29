import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Experience } from '../types';
import { formatCurrency } from '../utils/helpers';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/experience/${experience._id}`)}
    >
      <div className="relative h-48 bg-gray-200">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>Image not available</span>
          </div>
        ) : (
          <img 
            src={experience.imageUrl} 
            alt={experience.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{experience.title}</h3>
            <p className="text-sm text-gray-600">{experience.location}</p>
          </div>
          {experience.category === 'Adventure' && (
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded">
              Udupi
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {experience.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600">From </span>
            <span className="font-semibold text-gray-900">{formatCurrency(experience.price)}</span>
          </div>
          <button className="bg-primary text-gray-900 px-4 py-2 rounded text-sm font-medium hover:bg-yellow-400 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;