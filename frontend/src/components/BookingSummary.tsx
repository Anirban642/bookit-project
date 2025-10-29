import { formatCurrency } from '../utils/helpers';

interface BookingSummaryProps {
  price: number;
  quantity: number;
  onConfirm: () => void;
  disabled?: boolean;
}

const BookingSummary = ({ price, quantity, onConfirm, disabled }: BookingSummaryProps) => {
  const subtotal = price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Starts at</span>
          <span className="font-semibold">{formatCurrency(price)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Quantity</span>
          <span className="font-semibold">{quantity}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Taxes</span>
          <span className="font-semibold">{formatCurrency(taxes)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onConfirm}
        disabled={disabled}
        className="w-full bg-primary hover:bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm
      </button>
    </div>
  );
};

export default BookingSummary;