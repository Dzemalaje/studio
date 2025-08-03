"use client";

import { useState, useCallback, memo } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';

interface ImageCropperProps {
  imageSrc: string;
  onCrop: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

const ImageCropper = memo(({ imageSrc, onCrop, onCancel }: ImageCropperProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [imgRef, setImgRef] = useState<HTMLImageElement>();

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setImgRef(e.currentTarget);
  }, []);

  const handleCrop = useCallback(() => {
    if (!completedCrop || !imgRef) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleX = imgRef.naturalWidth / imgRef.width;
    const scaleY = imgRef.naturalHeight / imgRef.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      imgRef,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedImageUrl = URL.createObjectURL(blob);
        onCrop(croppedImageUrl);
      }
    }, 'image/jpeg', 0.9);
  }, [completedCrop, imgRef, onCrop]);

  return (
    <div className="space-y-4">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={1}
        circularCrop
      >
        <img 
          src={imageSrc} 
          onLoad={onImageLoad}
          alt="Crop me"
          style={{ maxHeight: '400px', maxWidth: '100%' }}
        />
      </ReactCrop>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleCrop}>
          Apply Crop
        </Button>
      </div>
    </div>
  );
});

ImageCropper.displayName = 'ImageCropper';

export { ImageCropper };