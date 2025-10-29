import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import ExperienceCard from '../components/ExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { experienceAPI } from '../services/api';
import type { Experience } from '../types';

const HomePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async (search?: string) => {
    try {
      setLoading(true);
      const data = await experienceAPI.getAll(search);
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadExperiences(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search experiences"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-yellow-400 text-gray-900 p-2 rounded-lg transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No experiences found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;