import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import DateSelector from '../components/DateSelector';
import TimeSlotSelector from '../components/TimeSlotSelector';
import QuantitySelector from '../components/QuantitySelector';
import BookingSummary from '../components/BookingSummary';
import LoadingSpinner from '../components/LoadingSpinner';
import { experienceAPI } from '../services/api';
import type { Experience, Slot } from '../types';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [experience, setExperience] = useState<Experience | null>(null);
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadExperienceDetails();
  }, [id]);

  const loadExperienceDetails = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await experienceAPI.getById(id);
      setExperience(data.experience);
      setAllSlots(data.slots);
      
      if (data.slots.length > 0) {
        const firstDate = data.slots[0].slotDate;
        setSelectedDate(firstDate);
      }
    } catch (error) {
      console.error('Error loading experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const availableDates = Array.from(new Set(allSlots.map(slot => slot.slotDate)));
  
  const slotsForSelectedDate = allSlots.filter(slot => slot.slotDate === selectedDate);

  const selectedSlot = allSlots.find(slot => slot._id === selectedSlotId);

  const handleConfirm = () => {
    if (!experience || !selectedSlot) return;
    
    navigate('/checkout', {
      state: {
        experience,
        slot: selectedSlot,
        quantity
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Experience not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Details</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-6">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">{experience.title}</h1>
                <p className="text-gray-600 mb-4">{experience.location}</p>
                <p className="text-gray-700">{experience.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <DateSelector
                dates={availableDates}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <TimeSlotSelector
                slots={slotsForSelectedDate}
                selectedSlot={selectedSlotId}
                onSelectSlot={setSelectedSlotId}
              />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4">About</h3>
              <p className="text-gray-700 text-sm">
                Scenic routes, trained guides, and safety briefing. Minimum age 10.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(q => q + 1)}
                  onDecrease={() => setQuantity(q => q - 1)}
                  max={selectedSlot?.availableSpots || 10}
                />
              </div>
              
              <BookingSummary
                price={experience.price}
                quantity={quantity}
                onConfirm={handleConfirm}
                disabled={!selectedSlotId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailsPage;