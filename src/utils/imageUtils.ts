/**
 * Converts a File object to a base64 string
 * @param file The file to convert
 * @returns A promise that resolves to the base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Compresses an image file to reduce its size
 * @param file The image file to compress
 * @param maxWidth The maximum width of the compressed image
 * @param quality The quality of the compressed image (0-1)
 * @returns A promise that resolves to a Blob containing the compressed image
 */
export const compressImage = (file: File, maxWidth = 800, quality = 0.7): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions if the image is larger than maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          },
          file.type,
          quality
        );
      };
      img.onerror = () => {
        reject(new Error('Image loading error'));
      };
    };
    reader.onerror = () => {
      reject(new Error('FileReader error'));
    };
  });
};

/**
 * Validates if a file is an image
 * @param file The file to validate
 * @returns True if the file is an image, false otherwise
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Validates if a file size is within the limit
 * @param file The file to validate
 * @param maxSizeMB The maximum file size in MB
 * @returns True if the file size is within the limit, false otherwise
 */
export const isFileSizeValid = (file: File, maxSizeMB = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};