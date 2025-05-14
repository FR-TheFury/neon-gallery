
import { useEffect } from "react";
import { GalleryImage } from "@/types/gallery";

interface ImageModalProps {
  image: GalleryImage | null;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 p-2 text-white hover:text-neon-purple"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="neon-border overflow-hidden">
          <img
            src={image.url}
            alt={image.name}
            className="max-w-full max-h-[80vh] object-contain"
          />
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-white">{image.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
