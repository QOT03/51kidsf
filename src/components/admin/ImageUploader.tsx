import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { fileToBase64, compressImage, isImageFile, isFileSizeValid } from '../../utils/imageUtils';
import Button from '../ui/Button';

interface ImageUploaderProps {
  onImageUploaded: (imageBase64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Reset states
    setError(null);
    setSuccess(false);
    setIsUploading(true);
    
    try {
      // Validate file type
      if (!isImageFile(file)) {
        setError('Please select an image file (JPEG, PNG, etc.)');
        setIsUploading(false);
        return;
      }
      
      // Validate file size (5MB max)
      if (!isFileSizeValid(file, 5)) {
        setError('Image size should be less than 5MB');
        setIsUploading(false);
        return;
      }
      
      // Compress the image
      const compressedBlob = await compressImage(file);
      const compressedFile = new File([compressedBlob], file.name, { type: file.type });
      
      // Convert to base64
      const base64 = await fileToBase64(compressedFile);
      
      // Pass the base64 string to the parent component
      onImageUploaded(base64);
      
      // Show success message
      setSuccess(true);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Image upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mt-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <Button
        type="button"
        variant="outline"
        onClick={triggerFileInput}
        disabled={isUploading}
        className="w-full flex items-center justify-center"
      >
        {isUploading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>
            <Upload size={16} className="mr-2" />
            Upload Image from Device
          </>
        )}
      </Button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 flex items-center">
          <X size={16} className="mr-1" />
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-2 text-sm text-green-600 flex items-center">
          <Check size={16} className="mr-1" />
          Image uploaded successfully!
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500 flex items-center">
        <ImageIcon size={12} className="mr-1" />
        Supported formats: JPEG, PNG, GIF. Max size: 5MB
      </div>
    </div>
  );
};

export default ImageUploader;