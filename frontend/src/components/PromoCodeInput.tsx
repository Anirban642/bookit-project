import { useState } from 'react';
import { promoAPI } from '../services/api';
import type { PromoCode } from '../types';

interface PromoCodeInputProps {
  onApply: (promo: PromoCode) => void;
  onRemove: () => void;
  appliedPromo: PromoCode | null;
}

const PromoCodeInput = ({ onApply, onRemove, appliedPromo }: PromoCodeInputProps) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!code.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      const response = await promoAPI.validate(code.toUpperCase());
      onApply(response.data);
      setCode('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid promo code');
    } finally {
      setLoading(false);
    }
  };

  if (appliedPromo) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
        <div>
          <p className="text-sm font-semibold text-green-800">
            {appliedPromo.code} Applied!
          </p>
          <p className="text-xs text-green-600">
            {appliedPromo.discountType === 'percentage' 
              ? `${appliedPromo.discountValue}% discount`
              : `₹${appliedPromo.discountValue} off`}
          </p>
        </div>
        <button
          onClick={onRemove}
          className="text-red-500 text-sm font-medium hover:text-red-700"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Promo code
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter code"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Checking...' : 'Apply'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PromoCodeInput;