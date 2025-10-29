import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">HD</span>
          </div>
          <div>
            <div className="text-sm font-semibold">highway</div>
            <div className="text-xs text-gray-600">delite</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;