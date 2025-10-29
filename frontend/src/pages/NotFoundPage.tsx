import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;