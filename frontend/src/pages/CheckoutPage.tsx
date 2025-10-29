import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Input from '../components/Input';
import PromoCodeInput from '../components/PromoCodeInput';
import CheckoutSummary from '../components/CheckoutSummary';
import { bookingAPI } from '../services/api';
import { validateEmail, calculateTotal } from '../utils/helpers';
import type { Experience, Slot, PromoCode } from '../types';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { experience, slot, quantity } = location.state as {
    experience: Experience;
    slot: Slot;
    quantity: number;
  };

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);

  if (!experience || !slot) {
    navigate('/');
    return null;
  }

  const validateForm = () => {
    const newErrors: { fullName?: string; email?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !agreed) return;

    try {
      setLoading(true);
      
      const { subtotal, taxes, total } = calculateTotal(
        experience.price,
        quantity,
        promoCode || undefined
      );

      const bookingData = {
        experienceId: experience._id,
        slotId: slot._id,
        fullName: fullName.trim(),
        email: email.trim(),
        quantity,
        subtotal,
        taxes,
        total,
        promoCode: promoCode?.code
      };

      const response = await bookingAPI.create(bookingData);

      navigate('/confirmation', {
        state: {
          bookingData: response.data,
          experience: experience.title,
          slot,
          quantity
        }
      });
    } catch (error: any) {
      alert(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Checkout</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-6">Contact Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full name"
                  value={fullName}
                  onChange={setFullName}
                  placeholder="Your name"
                  error={errors.fullName}
                  required
                />
                
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Your name"
                  error={errors.email}
                  required
                />
              </div>

              <div className="mt-6">
                <PromoCodeInput
                  onApply={setPromoCode}
                  onRemove={() => setPromoCode(null)}
                  appliedPromo={promoCode}
                />
              </div>

              <div className="mt-6">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the terms and safety policy
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CheckoutSummary
              experience={experience}
              slot={slot}
              quantity={quantity}
              promoCode={promoCode}
            />

            <button
              onClick={handleSubmit}
              disabled={loading || !agreed}
              className="w-full mt-4 bg-primary hover:bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Pay and Confirm'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;