import { useEffect, useRef } from 'react';

interface PhotoStripProps {
  photos: string[];
  layout: '4x1' | '2x2';
  backgroundColor: string;
  showDate: boolean;
  imageFilter?: string;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export default function PhotoStrip({ photos, layout, backgroundColor, showDate, imageFilter = 'none', onCanvasReady }: PhotoStripProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || photos.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const photoWidth = 300;
    const photoHeight = 400; 
    const padding = 20;
    const bottomPadding = showDate ? 60 : 20;
    const gap = 10;

    let canvasWidth = 0;
    let canvasHeight = 0;

    if (layout === '4x1') {
      canvasWidth = photoWidth + padding * 2;
      canvasHeight = (photoHeight * 4) + (gap * 3) + padding + bottomPadding;
    } else {
      canvasWidth = (photoWidth * 2) + gap + padding * 2;
      canvasHeight = (photoHeight * 2) + gap + padding + bottomPadding;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    let loadedCount = 0;
    photos.forEach((src, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        let x = 0;
        let y = 0;

        if (layout === '4x1') {
          x = padding;
          y = padding + index * (photoHeight + gap);
        } else {
          const col = index % 2;
          const row = Math.floor(index / 2);
          x = padding + col * (photoWidth + gap);
          y = padding + row * (photoHeight + gap);
        }

     
        const srcAspect = img.width / img.height;
        const dstAspect = photoWidth / photoHeight;

        let sWidth = img.width;
        let sHeight = img.height;
        let sx = 0;
        let sy = 0;

        if (srcAspect > dstAspect) {
          sWidth = img.height * dstAspect;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / dstAspect;
          sy = (img.height - sHeight) / 2;
        }

        if (imageFilter !== 'none') {
          ctx.filter = imageFilter;
        }
        ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, photoWidth, photoHeight);
        ctx.filter = 'none'; 
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, photoWidth, photoHeight);

        loadedCount++;
        
        if (loadedCount === photos.length) {
          if (showDate) {
            ctx.fillStyle = '#6B4423'; 
            ctx.font = 'italic 20px "Great Vibes", cursive'; 
            ctx.textAlign = 'center';
            const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            ctx.fillText(dateStr, canvasWidth / 2, canvasHeight - 20);
          }
          if (onCanvasReady) {
             onCanvasReady(canvas);
          }
        }
      };
    });

  }, [photos, layout, backgroundColor, showDate, imageFilter, onCanvasReady]);

  return (
    <div className="vintage-shadow inline-block">
      <canvas 
        ref={canvasRef} 
        className="max-w-full h-auto rounded-sm"
        style={{ maxHeight: '70vh' }}
      />
    </div>
  );
}
