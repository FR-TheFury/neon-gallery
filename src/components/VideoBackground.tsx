
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/use-media-query";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImageSrc?: string;
  lowPerformanceMode?: boolean;
}

const VideoBackground = ({
  videoSrc = "/src/video/background.mp4",
  fallbackImageSrc = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
  lowPerformanceMode = false
}: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [useFallback, setUseFallback] = useState(lowPerformanceMode);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Automatically use fallback on mobile devices
  useEffect(() => {
    if (isMobile) {
      console.log("Mobile device detected, using image fallback for better performance");
      setUseFallback(true);
    }
  }, [isMobile]);
  
  // Video loading logic
  useEffect(() => {
    if (useFallback) return;
    
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleCanPlay = () => {
        console.log("Video successfully loaded:", videoSrc);
        setIsVideoLoaded(true);
        
        // Try to start playback
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.warn("Autoplay blocked (normal behavior):", e);
          });
        }
      };
      
      const handleError = (e: Event) => {
        console.error("Video loading/playback error:", e);
        setVideoError(true);
        setUseFallback(true);
      };
      
      videoElement.addEventListener('canplaythrough', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      // If video is already buffered/loaded
      if (videoElement.readyState >= 3) {
        handleCanPlay();
      }
      
      // Force reload to resolve potential issues
      videoElement.load();
      
      return () => {
        videoElement.removeEventListener('canplaythrough', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [videoSrc, useFallback]);

  // User can toggle performance mode
  const togglePerformanceMode = () => {
    setUseFallback(!useFallback);
    if (videoRef.current && !useFallback) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Video (only shown if not in fallback mode) */}
      {!useFallback && !videoError && (
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={`${videoSrc}?t=${Date.now()}`} type="video/mp4" />
        </video>
      )}
      
      {/* Image background (shown as fallback or when video has errors) */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000`}
        style={{ 
          backgroundImage: `url(${fallbackImageSrc})`,
          opacity: (useFallback || videoError) ? 1 : 0 
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-dark/30 to-neon-dark"></div>

      {/* Performance toggle button */}
      <button 
        onClick={togglePerformanceMode}
        className="absolute bottom-4 right-4 bg-neon-dark/80 text-white text-xs px-2 py-1 rounded-md z-10"
        title={useFallback ? "Enable video background" : "Use low-performance mode"}
      >
        {useFallback ? "Enable Video" : "Low Performance Mode"}
      </button>
    </div>
  );
};

export default VideoBackground;
