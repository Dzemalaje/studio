
"use client";

import { useState, useRef, useCallback, memo } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Crop as CropIcon, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';

interface ImageCropperProps {
  imageSrc: string;
  onCrop: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

export const ImageCropper = memo(function ImageCropper({ imageSrc, onCrop, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        width,
        height,
      ),
      width,
      height,
    );
    setCrop(crop);
  }, []);

  const handleCrop = useCallback(async () => {
    if (!imgRef.current || !completedCrop) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    ctx.imageSmoothingQuality = 'high';
    ctx.save();

    // Apply rotation
    if (rotate !== 0) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    ctx.restore();

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedImageUrl = URL.createObjectURL(blob);
        onCrop(croppedImageUrl);
      }
    }, 'image/jpeg', 0.9);
  }, [completedCrop, rotate, onCrop]);

  return (
    <div className="space-y-6 p-4">
      <div className="relative overflow-hidden rounded-lg border bg-muted/20">
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          className="max-h-96"
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imageSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
            className="max-w-full h-auto transition-transform duration-200"
          />
        </ReactCrop>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ZoomIn className="h-4 w-4" />
            Zoom: {Math.round(scale * 100)}%
          </div>
          <Slider
            value={[scale]}
            onValueChange={(value) => setScale(value[0])}
            max={3}
            min={0.5}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRotate((prev) => prev + 90)}
            className="flex items-center gap-2"
          >
            <RotateCw className="h-4 w-4" />
            Rotate
          </Button>
          <span className="text-sm text-muted-foreground">{rotate}°</span>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleCrop} className="bg-primary text-primary-foreground">
          <Download className="mr-2 h-4 w-4" />
          Apply Crop
        </Button>
      </div>
    </div>
  );
});
