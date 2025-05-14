
import { useState, useEffect } from "react";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImageSrc?: string;
}

const VideoBackground = ({
  videoSrc = "/src/video/background.mp4",
  fallbackImageSrc = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
}: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Vérifie si le fichier vidéo existe et est accessible
    const videoElement = document.createElement('video');
    videoElement.src = videoSrc;
    videoElement.oncanplaythrough = () => {
      console.log("Vidéo chargée avec succès:", videoSrc);
      setIsVideoLoaded(true);
    };
    videoElement.onerror = (e) => {
      console.error("Erreur de chargement de la vidéo:", e);
      setVideoError(true);
    };

    return () => {
      videoElement.oncanplaythrough = null;
      videoElement.onerror = null;
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {!videoError && (
        <video 
          autoPlay 
          muted 
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          onCanPlay={() => setIsVideoLoaded(true)}
          onError={(e) => {
            console.error("Erreur de lecture vidéo:", e);
            setVideoError(true);
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Vidéo non supportée */}
        </video>
      )}
      
      {/* Image de secours toujours chargée mais cachée quand la vidéo fonctionne */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${isVideoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${fallbackImageSrc})` }}
      />
      
      {/* Superposition de gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-dark/30 to-neon-dark"></div>
    </div>
  );
};

export default VideoBackground;
