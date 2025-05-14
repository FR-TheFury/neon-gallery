
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import { useIsMobile } from "../hooks/use-mobile";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImageSrc?: string;
  lowPerformanceMode?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

const VideoBackground = ({
  videoSrc = "/src/video/background.mp4",
  fallbackImageSrc = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
  lowPerformanceMode = false,
  quality = 'medium'
}: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [useFallback, setUseFallback] = useState(lowPerformanceMode);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const isLowPerfDevice = useMediaQuery("(prefers-reduced-motion: reduce)");
  
  const frameRate = quality === 'low' ? 15 : quality === 'medium' ? 24 : 30;
  const videoQuality = quality === 'low' ? '480p' : quality === 'medium' ? '720p' : '1080p';
  
  // Automatically use fallback on mobile devices or low performance devices
  useEffect(() => {
    if (isMobile || isLowPerfDevice) {
      console.log("Mobile or low performance device detected, using image fallback for better performance");
      setUseFallback(true);
    }
  }, [isMobile, isLowPerfDevice]);
  
  // Performance monitoring
  useEffect(() => {
    if (useFallback || !videoRef.current) return;
    
    let frameCount = 0;
    let lastFrameTime = performance.now();
    let lowPerformanceDetected = false;
    
    // Detect performance issues
    const checkPerformance = () => {
      const now = performance.now();
      const timeElapsed = now - lastFrameTime;
      
      if (timeElapsed > 1000) { // Check every second
        const fps = frameCount / (timeElapsed / 1000);
        console.log(`Current video playback FPS: ${fps.toFixed(1)}`);
        
        if (fps < 20 && !lowPerformanceDetected) { // If FPS drops below 20, switch to fallback
          console.warn("Low performance detected, switching to image fallback");
          lowPerformanceDetected = true;
          setUseFallback(true);
        }
        
        // Reset counters
        frameCount = 0;
        lastFrameTime = now;
      }
      
      frameCount++;
      
      if (!lowPerformanceDetected && !useFallback) {
        requestAnimationFrame(checkPerformance);
      }
    };
    
    requestAnimationFrame(checkPerformance);
  }, [useFallback]);
  
  // Video loading logic
  useEffect(() => {
    if (useFallback) return;
    
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Set video attributes for better performance
      videoElement.playsInline = true;
      videoElement.muted = true;
      videoElement.autoplay = true;
      videoElement.loop = true;
      
      if (quality === 'low') {
        videoElement.playbackRate = 0.75; // Slow down playback for better performance
      }
      
      const handleCanPlay = () => {
        console.log("Video successfully loaded:", videoSrc);
        setIsVideoLoaded(true);
        
        // Try to start playback
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.warn("Autoplay blocked (normal behavior):", e);
            setUseFallback(true);
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
  }, [videoSrc, useFallback, quality]);

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
          style={{ willChange: 'transform, opacity' }}
        >
          <source src={`${videoSrc}?t=${Date.now()}&quality=${videoQuality}&fps=${frameRate}`} type="video/mp4" />
        </video>
      )}
      
      {/* Image background (shown as fallback or when video has errors) */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000`}
        style={{ 
          backgroundImage: `url(${fallbackImageSrc})`,
          opacity: (useFallback || videoError) ? 1 : 0,
          willChange: 'opacity'
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
