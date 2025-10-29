import type { Slot } from '../types';
import { formatTime } from '../utils/helpers';

interface TimeSlotSelectorProps {
  slots: Slot[];
  selectedSlot: string | null;
  onSelectSlot: (slotId: string) => void;
}

const TimeSlotSelector = ({ slots, selectedSlot, onSelectSlot }: TimeSlotSelectorProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">Choose time</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const isSelected = slot._id === selectedSlot;
          const isSoldOut = slot.availableSpots === 0;
          
          return (
            <button
              key={slot._id}
              onClick={() => !isSoldOut && onSelectSlot(slot._id)}
              disabled={isSoldOut}
              className={`p-3 rounded-lg border-2 transition-all ${
                isSoldOut
                  ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                  : isSelected
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold">{formatTime(slot.slotTime)}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {isSoldOut ? 'Sold out' : `${slot.availableSpots} left`}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;