import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PhotoStrip from '../components/PhotoStrip';
import { Download, RefreshCcw } from 'lucide-react';

export default function Customize() {
  const location = useLocation();
  const navigate = useNavigate();
  const photos = location.state?.photos || [];

  const [layout, setLayout] = useState<'4x1' | '2x2'>('4x1');
  const [bgColor, setBgColor] = useState<string>('#FAF8F5');
  const [showDate, setShowDate] = useState<boolean>(true);
  const [imageFilter, setImageFilter] = useState<string>('none');
  const [finalCanvas, setFinalCanvas] = useState<HTMLCanvasElement | null>(null);

  const colors = [
    { name: 'Cream', value: '#FAF8F5' },
    { name: 'Lavender', value: '#d1cfd4' }, 
    { name: 'Rose', value: '#FDEAEB' },
    { name: 'Black', value: '#1A1A1A' },
  ];

  const filterOptions = [
    { name: 'Original', value: 'none' },
    { name: 'Monochrome', value: 'grayscale(100%)' },
    { name: 'Vintage', value: 'sepia(80%) contrast(1.1) brightness(0.9) saturate(1.2)' },
  ];

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    setFinalCanvas(canvas);
  }, []);

  const downloadStrip = () => {
    if (finalCanvas) {
      const link = document.createElement('a');
      link.download = `photobooth-${Date.now()}.png`;
      link.href = finalCanvas.toDataURL('image/png');
      link.click();
    }
  };

  if (!photos || photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <p className="text-xl">No photos found.</p>
        <button onClick={() => navigate('/')} className="text-vintage-brown underline">Go Home</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto py-8">
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] bg-black/5 rounded-xl p-4">
        <PhotoStrip 
          photos={photos} 
          layout={layout} 
          backgroundColor={bgColor} 
          showDate={showDate} 
          imageFilter={imageFilter}
          onCanvasReady={handleCanvasReady}
        />
      </div>

      <div className="flex-1 flex flex-col space-y-8">
        <h2 className="font-cursive text-4xl text-vintage-brown">Customize your photostrip</h2>

        <div className="space-y-4">
          <h3 className="font-serif text-xl text-vintage-brown/80">Layout</h3>
          <div className="flex gap-4">
            <button 
              onClick={() => setLayout('4x1')}
              className={`w-16 h-16 flex flex-col gap-1 p-2 rounded-full border-2 transition-all ${layout === '4x1' ? 'border-vintage-brown shadow-md bg-white' : 'border-transparent bg-black/5 hover:bg-black/10'}`}
              title="4x1 Vertical Strip"
            >
              <div className="w-full flex-1 bg-gray-400 rounded-sm"></div>
              <div className="w-full flex-1 bg-gray-400 rounded-sm"></div>
              <div className="w-full flex-1 bg-gray-400 rounded-sm"></div>
              <div className="w-full flex-1 bg-gray-400 rounded-sm"></div>
            </button>
            <button 
              onClick={() => setLayout('2x2')}
              className={`w-16 h-16 grid grid-cols-2 grid-rows-2 gap-1 p-2 rounded-full border-2 transition-all ${layout === '2x2' ? 'border-vintage-brown shadow-md bg-white' : 'border-transparent bg-black/5 hover:bg-black/10'}`}
              title="2x2 Grid"
            >
              <div className="bg-gray-400 rounded-sm w-full h-full"></div>
              <div className="bg-gray-400 rounded-sm w-full h-full"></div>
              <div className="bg-gray-400 rounded-sm w-full h-full"></div>
              <div className="bg-gray-400 rounded-sm w-full h-full"></div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-xl text-vintage-brown/80">Photo Filter</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((f) => (
              <button
                key={f.name}
                onClick={() => setImageFilter(f.value)}
                className={`py-2 px-4 rounded-full border-2 transition-all ${imageFilter === f.value ? 'border-vintage-brown shadow-md bg-white text-vintage-brown' : 'border-transparent bg-black/5 hover:bg-black/10 text-black/70'}`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-xl text-vintage-brown/80">Frame Color</h3>
          <div className="flex gap-3">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setBgColor(c.value)}
                className={`w-10 h-10 rounded-full border-2 transition-transform ${bgColor === c.value ? 'border-vintage-brown scale-110 shadow-md' : 'border-black/10 hover:scale-105'}`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-xl text-vintage-brown/80">Display date stamp</h3>
          <button 
            onClick={() => setShowDate(!showDate)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${showDate ? 'bg-vintage-brown' : 'bg-gray-300'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full transition-transform ${showDate ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={downloadStrip}
            disabled={!finalCanvas}
            className="flex-1 bg-vintage-brown text-white py-3 px-6 rounded-md hover:bg-vintage-brown/90 transition-colors flex items-center justify-center gap-2 vintage-shadow font-serif text-lg disabled:opacity-50"
          >
            <Download size={20} />
            Download
          </button>
          <button
            onClick={() => navigate('/camera')}
            className="flex-1 bg-transparent border-2 border-vintage-brown text-vintage-brown py-3 px-6 rounded-md hover:bg-vintage-brown/10 transition-colors flex items-center justify-center gap-2 font-serif text-lg"
          >
            <RefreshCcw size={20} />
            Retake
          </button>
        </div>
      </div>
    </div>
  );
}
