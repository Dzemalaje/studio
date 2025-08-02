
"use client";

import { useState, useRef, useCallback, memo } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Crop as CropIcon, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const ImageCropper = memo(function ImageCropper({ imageSrc, onCropComplete }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const aspect = 1;
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }, [aspect]);
  
  const handleCropImage = useCallback(() => {
    if (
      !completedCrop ||
      !previewCanvasRef.current ||
      !imgRef.current
    ) {
      return;
    }
  
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    const offscreen = new OffscreenCanvas(crop.width * scaleX, crop.height * scaleY);
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    
    // Create a new canvas to draw the scaled and rotated image to avoid quality loss
    const finalCanvas = document.createElement('canvas');
    const finalCtx = finalCanvas.getContext('2d');
    if (!finalCtx) return;

    finalCanvas.width = 512;
    finalCanvas.height = 512;

    finalCtx.drawImage(offscreen.transferToImageBitmap(), 0, 0, 512, 512);

    onCropComplete(finalCanvas.toDataURL('image/jpeg'));
  }, [completedCrop, onCropComplete]);

  const handleScaleChange = useCallback((values: number[]) => {
    setScale(values[0]);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-center bg-muted rounded-md overflow-hidden">
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          circularCrop
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imageSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      </div>

       <div className="flex items-center gap-4">
        <ZoomOut className="text-muted-foreground"/>
        <Slider
            value={[scale]}
            min={0.5}
            max={2}
            step={0.01}
            onValueChange={handleScaleChange}
        />
        <ZoomIn className="text-muted-foreground" />
      </div>

      <Button onClick={handleCropImage} className="w-full text-white">
        <CropIcon className="mr-2" />
        Crop Image
      </Button>

      {!!completedCrop && (
        <canvas
            ref={previewCanvasRef}
            className="hidden"
        />
      )}
    </div>
  );
