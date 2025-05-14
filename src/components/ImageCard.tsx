
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { GalleryImage } from "@/types/gallery";

interface ImageCardProps {
  image: GalleryImage;
  onClick?: (image: GalleryImage) => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [imageUrl, setImageUrl] = useState(image.url);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Utiliser IntersectionObserver pour le chargement paresseux
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Préchargement quand l'image est à 200px de la zone visible
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    if (retryCount < 3) {
      // Retry loading the image with a new timestamp
      setRetryCount(prev => prev + 1);
      const timestamp = new Date().getTime();
      const newUrl = `${image.url.split('&t=')[0]}&t=${timestamp}`;
      setImageUrl(newUrl);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleClick = () => {
    if (onClick && !hasError) {
      onClick({...image, url: imageUrl});
    }
  };

  // Retry loading the image with a slight delay
  const retryImage = () => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
    const timestamp = new Date().getTime();
    const newUrl = `${image.url.split('&t=')[0]}&t=${timestamp}`;
    setImageUrl(newUrl);
  };

  return (
    <Card 
      ref={cardRef}
      className="cyberpunk-card group cursor-pointer h-full neon-border transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neon-dark">
            <div className="w-6 h-6 border-2 border-t-neon-red rounded-full animate-spin"></div>
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neon-dark">
            <p className="text-xs text-red-400 mb-2">Failed to load</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                retryImage();
              }}
              className="text-xs px-2 py-1 bg-neon-red text-white rounded-sm hover:bg-neon-pink"
            >
              Retry
            </button>
          </div>
        ) : (
          // Ne charger l'image que lorsqu'elle est visible ou sur le point de l'être
          isVisible && (
            <img
              src={imageUrl}
              alt={image.name}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs font-medium text-white truncate neon-text">{image.name}</p>
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
