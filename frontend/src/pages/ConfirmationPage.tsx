import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { formatDate, formatTime } from '../utils/helpers';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingData, experience, slot, quantity } = location.state || {};

  if (!bookingData) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={48} className="text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed
          </h1>
          
          <p className="text-gray-600 mb-8">
            Ref ID: <span className="font-semibold">{bookingData.referenceId}</span>
          </p>

          <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
            <h2 className="font-semibold text-lg mb-4">Booking Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Experience</span>
                <span className="font-semibold text-gray-900">{experience}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold text-gray-900">
                  {formatDate(slot.slotDate)}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Time</span>
                <span className="font-semibold text-gray-900">
                  {formatTime(slot.slotTime)}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Quantity</span>
                <span className="font-semibold text-gray-900">{quantity}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Name</span>
                <span className="font-semibold text-gray-900">{bookingData.fullName}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Email</span>
                <span className="font-semibold text-gray-900">{bookingData.email}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-green-800">
              A confirmation email has been sent to <strong>{bookingData.email}</strong>
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage;