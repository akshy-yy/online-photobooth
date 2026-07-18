import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        return dataUrl;
      }
    }
    return null;
  }, []);

  const startSequence = async () => {
    setCapturing(true);
    const capturedPhotos: string[] = [];
    
    for (let i = 0; i < 4; i++) {
      for (let c = 5; c > 0; c--) {
        setCountdown(c);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      
      setCountdown(0); 
      const photo = capturePhoto();
      if (photo) {
        capturedPhotos.push(photo);
        setPhotos([...capturedPhotos]);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setCountdown(null);
    setCapturing(false);
    
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    
    navigate('/customize', { state: { photos: capturedPhotos } });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full">
      <h2 className="font-cursive text-4xl text-vintage-brown">Get Ready...</h2>
      
      <div className="relative w-full max-w-sm aspect-[3/4] bg-black rounded-lg overflow-hidden vintage-shadow border-4 border-vintage-border">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
        
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="text-8xl font-bold text-white drop-shadow-lg">
              {countdown > 0 ? countdown : '📸'}
            </span>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-12 h-16 rounded-sm border-2 ${
              photos[i] ? 'border-vintage-brown' : 'border-vintage-border border-dashed'
            } overflow-hidden`}
          >
            {photos[i] && (
              <img src={photos[i]} alt={`Pic ${i + 1}`} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>

      {!capturing && (
        <button
          onClick={startSequence}
          className="bg-vintage-brown text-white py-3 px-8 rounded-full hover:bg-vintage-brown/90 transition-colors flex items-center justify-center gap-2 vintage-shadow font-serif text-lg w-full max-w-xs mt-4"
        >
          <Camera size={24} />
          Start Smiling :p
        </button>
      )}
    </div>
  );
}
