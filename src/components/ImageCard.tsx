
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { GalleryImage } from "@/types/gallery";

interface ImageCardProps {
  image: GalleryImage;
  onClick?: (image: GalleryImage) => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(image);
    }
  };

  return (
    <Card 
      className="cyberpunk-card group cursor-pointer h-full neon-border transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neon-dark">
            <div className="w-8 h-8 border-3 border-t-neon-red rounded-full animate-spin"></div>
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-neon-dark">
            <p className="text-xs text-red-400">Failed to load</p>
          </div>
        ) : (
          <img
            src={image.url}
            alt={image.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs font-medium text-white truncate neon-text">{image.name}</p>
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
