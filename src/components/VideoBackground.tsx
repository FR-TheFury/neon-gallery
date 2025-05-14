
import { useState, useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImageSrc?: string;
}

const VideoBackground = ({
  videoSrc = "/video/background.mp4",
  fallbackImageSrc = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
}: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Format local? (commence par /)
  const isLocalVideo = videoSrc.startsWith('/');

  useEffect(() => {
    // Référence au video élément
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Configurer les écouteurs d'événements directement sur la référence
      const handleCanPlay = () => {
        console.log("Vidéo chargée avec succès:", videoSrc);
        setIsVideoLoaded(true);
        
        // Essayer de démarrer la lecture
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.warn("Lecture automatique bloquée (comportement normal):", e);
            // La lecture automatique est souvent bloquée par les navigateurs
          });
        }
      };
      
      const handleError = (e: Event) => {
        console.error("Erreur de chargement/lecture de la vidéo:", e);
        setVideoError(true);
      };
      
      videoElement.addEventListener('canplaythrough', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      // Si la vidéo est déjà mise en mémoire tampon/chargée
      if (videoElement.readyState >= 3) {
        handleCanPlay();
      }
      
      // Forcer le rechargement pour résoudre les problèmes potentiels
      videoElement.load();
      
      return () => {
        videoElement.removeEventListener('canplaythrough', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {!videoError && (
        <video 
          ref={videoRef}
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
          <source src={`${videoSrc}${isLocalVideo ? `?t=${Date.now()}` : ''}`} type="video/mp4" />
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
