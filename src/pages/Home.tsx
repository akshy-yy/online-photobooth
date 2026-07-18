import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center space-y-10 py-12">
      <div className="relative">
        <div className="w-48 h-64 bg-vintage-border/30 rounded-sm shadow-md flex items-center justify-center rotate-[-5deg] absolute -z-10 top-2 left-2"></div>
        <div className="w-48 h-64 bg-white p-2 rounded-sm vintage-shadow flex flex-col space-y-2 rotate-[3deg]">
          <div className="flex-1 bg-gray-200"></div>
          <div className="flex-1 bg-gray-300"></div>
          <div className="flex-1 bg-gray-400"></div>
          <div className="h-6 flex items-center justify-center">
            <span className="font-cursive text-xs text-vintage-brown">Capture Special Moments</span>
          </div>
        </div>
      </div>

      <h1 className="font-cursive text-5xl md:text-6xl text-vintage-brown tracking-wide text-center drop-shadow-sm">
        Photobooth :p
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 w-full px-4">
        <button
          onClick={() => navigate('/camera')}
          className="flex-1 bg-vintage-brown text-white py-3 px-6 rounded-md hover:bg-vintage-brown/90 transition-colors flex items-center justify-center gap-2 vintage-shadow font-serif text-lg"
        >
          <Camera size={20} />
          Take Photos
        </button>
      </div>
    </div>
  );
}
