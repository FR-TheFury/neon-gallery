
import { useState, useEffect } from "react";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImageSrc?: string;
}

const VideoBackground = ({
  videoSrc = "/My-Media/video/cyberpunk-video.mp4",
  fallbackImageSrc = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
}: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const videoElement = document.createElement('video');
    videoElement.src = videoSrc;
    videoElement.oncanplaythrough = () => setIsVideoLoaded(true);
    videoElement.onerror = () => setVideoError(true);

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
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Video not supported */}
        </video>
      )}
      
      {/* Fallback image always loaded but hidden when video is playing correctly */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${isVideoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${fallbackImageSrc})` }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-dark/30 to-neon-dark"></div>
    </div>
  );
};

export default VideoBackground;
