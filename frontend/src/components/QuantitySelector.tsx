import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
}

const QuantitySelector = ({ quantity, onIncrease, onDecrease, max = 10 }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold">Quantity</span>
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center font-semibold">{quantity}</span>
        <button
          onClick={onIncrease}
          disabled={quantity >= max}
          className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;