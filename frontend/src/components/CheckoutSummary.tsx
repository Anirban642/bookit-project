import { formatCurrency, formatDate, formatTime } from '../utils/helpers';
import type { Experience, Slot, PromoCode } from '../types';

interface CheckoutSummaryProps {
  experience: Experience;
  slot: Slot;
  quantity: number;
  promoCode: PromoCode | null;
}

const CheckoutSummary = ({ experience, slot, quantity, promoCode }: CheckoutSummaryProps) => {
  const subtotal = experience.price * quantity;
  let discount = 0;

  if (promoCode) {
    if (promoCode.discountType === 'percentage') {
      discount = (subtotal * promoCode.discountValue) / 100;
    } else {
      discount = promoCode.discountValue;
    }
  }

  const afterDiscount = subtotal - discount;
  const taxes = Math.round(afterDiscount * 0.06);
  const total = afterDiscount + taxes;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h3 className="font-semibold mb-2">Experience</h3>
        <p className="text-gray-900">{experience.title}</p>
      </div>

      <div className="mb-4 pb-4 border-b border-gray-200">
        <h3 className="font-semibold mb-2">Date</h3>
        <p className="text-gray-900">{formatDate(slot.slotDate)}</p>
      </div>

      <div className="mb-4 pb-4 border-b border-gray-200">
        <h3 className="font-semibold mb-2">Time</h3>
        <p className="text-gray-900">{formatTime(slot.slotTime)}</p>
      </div>

      <div className="mb-4 pb-4 border-b border-gray-200">
        <h3 className="font-semibold mb-2">Qty</h3>
        <p className="text-gray-900">{quantity}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-semibold">-{formatCurrency(discount)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Taxes</span>
          <span className="font-semibold">{formatCurrency(taxes)}</span>
        </div>
        
        <div className="flex justify-between pt-2 border-t border-gray-300">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;