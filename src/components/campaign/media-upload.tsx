'use client';

import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { Slider} from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, AlertCircle, Crop } from 'lucide-react';

interface MediaUploadProps {
  onFilesChange: (files: File[]) => void;
  files: File[];
}

interface CroppedAreaPixels {
  width: number;
  height: number;
  x: number;
  y: number;
}

export function MediaUpload({ onFilesChange, files }: MediaUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showCrop, setShowCrop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles];
    onFilesChange(newFiles);

    const newPreviewUrls = acceptedFiles
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => URL.createObjectURL(file));

    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 50 * 1024 * 1024,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);

    if (index < previewUrls.length) {
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleCrop = (index: number) => {
    setCurrentImageIndex(index);
    setShowCrop(true);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const onCropComplete = useCallback((_: any, croppedArea: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedArea);
  }, []);

  const getCroppedImg = async (
    imageSrc: string,
    crop: CroppedAreaPixels,
    rotation: number
  ): Promise<Blob> => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/jpeg');
    });
  };

  const handleCropComplete = async () => {
    if (currentImageIndex === -1 || !croppedAreaPixels) return;

    const imageUrl = previewUrls[currentImageIndex];
    const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
    const croppedFile = new File([croppedBlob], files[currentImageIndex].name, {
      type: files[currentImageIndex].type,
    });

    const updatedFiles = [...files];
    updatedFiles[currentImageIndex] = croppedFile;
    onFilesChange(updatedFiles);

    const newPreviewUrls = [...previewUrls];
    newPreviewUrls[currentImageIndex] = URL.createObjectURL(croppedBlob);
    setPreviewUrls(newPreviewUrls);

    setShowCrop(false);
    setCurrentImageIndex(-1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Upload Media Files</h3>
        <span className="text-sm text-gray-500">{files.length} files selected</span>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-yellow-800">LED Screen Requirements</p>
          <p className="text-sm text-yellow-700 mt-1">
            Our LED screens are 240x80 pixels. Please ensure your media files match these dimensions for optimal display.
          </p>
        </div>
      </div>

      <Card
        {...getRootProps()}
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-yellow-400 bg-yellow-50' : 'border-yellow-200 hover:border-yellow-300'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Upload className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {isDragActive ? 'Drop the files here' : 'Drag & drop images or videos here, or click to select files'}
            </p>
            <p className="text-xs text-gray-500">Supported formats: JPG, PNG, GIF, MP4, MOV, AVI (max 50MB)</p>
          </div>
        </div>
      </Card>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              {file.type.startsWith('image/') ? (
                <div className="relative">
                  <img
                    src={previewUrls[index]}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                    onClick={() => handleCrop(index)}
                  >
                    <Crop className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              ) : (
                <div className="w-full h-32 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-yellow-600">Video File</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                onClick={() => removeFile(index)}
              >
                <X className="w-4 h-4 text-gray-600" />
              </Button>
              <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {showCrop && currentImageIndex !== -1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full h-[90vh] flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Crop Image (240x80)</h3>
            <div className="relative flex-1 bg-black">
              <Cropper
                image={previewUrls[currentImageIndex]}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={240 / 80}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                showGrid={true}
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <label className="text-sm w-20">Zoom</label>
                <Slider
                  value={[zoom]}
                  min={1}
                  max={3}
                  step={0.1}
                  onValueChange={(value) => setZoom(value[0])}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm w-20">Rotation</label>
                <Slider
                  value={[rotation]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={(value) => setRotation(value[0])}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCrop(false);
                  setCurrentImageIndex(-1);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCropComplete}>Apply Crop</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
