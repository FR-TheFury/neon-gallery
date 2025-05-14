
import { useEffect, useState } from "react";
import { GalleryImage } from "@/types/gallery";

interface ImageModalProps {
  image: GalleryImage | null;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Use the higher quality image for full screen display
  const fullSizeUrl = image ? image.url.replace('sz=w1000', 'sz=w3000') : '';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose, isZoomed]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setErrorLoading(false);
  };

  const handleImageError = () => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      // Try loading again with a new timestamp
      const timestamp = new Date().getTime();
      const img = new Image();
      img.src = `${fullSizeUrl}&timestamp=${timestamp}`;
      img.onload = () => {
        setIsLoading(false);
        setErrorLoading(false);
        // Update the image source with the successful URL
        document.getElementById('modal-image')?.setAttribute('src', img.src);
      };
      img.onerror = () => {
        if (retryCount >= 2) {
          setIsLoading(false);
          setErrorLoading(true);
        }
      };
    } else {
      setIsLoading(false);
      setErrorLoading(true);
    }
  };

  const toggleZoom = (e: React.MouseEvent) => {
    if (!errorLoading) {
      e.stopPropagation();
      setIsZoomed(!isZoomed);
    }
  };

  const retryLoadImage = () => {
    setIsLoading(true);
    setErrorLoading(false);
    setRetryCount(0);
    // Force reload image with timestamp
    const timestamp = new Date().getTime();
    const newUrl = `${fullSizeUrl}&timestamp=${timestamp}`;
    
    const img = new Image();
    img.src = newUrl;
    img.onload = () => {
      setIsLoading(false);
      // Update the image source with the successful URL
      document.getElementById('modal-image')?.setAttribute('src', newUrl);
    };
    img.onerror = () => {
      handleImageError();
    };
  };

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] p-3 text-white hover:text-neon-purple bg-black/50 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div 
        className={`relative flex justify-center items-center w-full h-full ${
          isZoomed ? 'cursor-zoom-out overflow-auto' : 'cursor-zoom-in overflow-hidden'
        }`}
        onClick={toggleZoom}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-neon-purple rounded-full animate-spin"></div>
          </div>
        )}

        {errorLoading ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-neon-red text-xl mb-4">Failed to load image</p>
            <button 
              className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-pink transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                retryLoadImage();
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <img
            id="modal-image"
            src={fullSizeUrl}
            alt={image.name}
            className={`
              ${isZoomed ? 'max-w-none max-h-none w-auto h-auto' : 'max-w-[95vw] max-h-[95vh] w-auto h-auto'} 
              object-contain transition-transform duration-300
              ${isLoading ? 'opacity-0' : 'opacity-100'}
            `}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center bg-black/70 py-2 px-4">
        <h3 className="text-xl font-bold text-neon-red neon-text">{image.name}</h3>
        <p className="text-white text-sm mt-1">Click to {isZoomed ? 'zoom out' : 'zoom in'}</p>
      </div>
    </div>
  );
};

export default ImageModal;
