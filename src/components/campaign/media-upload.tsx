'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, AlertCircle } from 'lucide-react';

interface MediaUploadProps {
  onFilesChange: (files: File[]) => void;
  files: File[];
}

export function MediaUpload({ onFilesChange, files }: MediaUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles];
    onFilesChange(newFiles);

    // Create preview URLs for images
    const newPreviewUrls = acceptedFiles
      .filter(file => file.type.startsWith('image/'))
      .map(file => URL.createObjectURL(file));
    
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
    
    // Clean up preview URL if it's an image
    if (index < previewUrls.length) {
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Upload Media Files</h3>
        <span className="text-sm text-gray-500">
          {files.length} files selected
        </span>
      </div>

      {/* LED Screen Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-yellow-800">LED Screen Requirements</p>
          <p className="text-sm text-yellow-700 mt-1">
            Our LED screens are 480x80 pixels. Please ensure your media files match these dimensions for optimal display.
          </p>
        </div>
      </div>

      <Card
        {...getRootProps()}
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-yellow-400 bg-yellow-50' 
            : 'border-yellow-200 hover:border-yellow-300'
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
              {isDragActive
                ? 'Drop the files here'
                : 'Drag & drop images or videos here, or click to select files'}
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, GIF, MP4, MOV, AVI (max 50MB)
            </p>
          </div>
        </div>
      </Card>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              {file.type.startsWith('image/') ? (
                <img
                  src={previewUrls[index]}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-32 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-yellow-600">Video File</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                onClick={() => removeFile(index)}
              >
                <X className="w-4 h-4 text-gray-600" />
              </Button>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 