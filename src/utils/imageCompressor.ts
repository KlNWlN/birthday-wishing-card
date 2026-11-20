/**
 * Client-side HTML5 Canvas Image Resizer and Compressor
 * Constrains width/height to max 180px and compresses to JPEG at 0.55 quality
 * Keeps the payload extremely small (~2-3 KB per photo) so all 4 photos fit cleanly into URL hash
 */

export async function compressImageFile(file: File, maxDimension = 180, quality = 0.55): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale proportionally to fit within maxDimension x maxDimension
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Fill with subtle warm white background in case of transparent PNG
        ctx.fillStyle = '#FFFDF9';
        ctx.fillRect(0, 0, width, height);

        // Smooth image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight JPEG data URL
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
