import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronUp, ChevronDown, Music, Shuffle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { onAudioEvent } from "@/events/audioEvents";
import { soundcloudService, SoundCloudTrack } from "@/services/soundcloudService";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [wasPlayingBeforePause, setWasPlayingBeforePause] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundCloudTrack | null>(null);
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Initialize with a random track
  useEffect(() => {
    const initialTrack = soundcloudService.getRandomTrack();
    setCurrentTrack(initialTrack);
  }, []);

  // Load next random track
  const loadNextTrack = () => {
    setIsLoadingTrack(true);
    const nextTrack = soundcloudService.getNextRandomTrack(currentTrack?.id);
    setCurrentTrack(nextTrack);
    setAudioLoaded(false);
    setAudioError(false);
    setCurrentTime(0);
    setDuration(0);
    
    // Reset audio element
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // For now, fallback to local file since we need real SoundCloud URLs
    // In production, you would use: audio.src = currentTrack.url;
    audio.src = "/music/background.mp3";
    audio.load();
    setIsLoadingTrack(false);
  }, [currentTrack]);

  // Listen for user interaction with the page
  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
    };
    
    // These events indicate user interaction
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);
  
  // Listen for audio events
  useEffect(() => {
    // Set up event handlers
    const handlePauseMusic = () => {
      console.log("Received event to pause background music");
      const audio = audioRef.current;
      if (!audio) return;
      
      // Store current playing state before pausing
      setWasPlayingBeforePause(isPlaying);
      
      // Pause audio if playing
      if (isPlaying && audio) {
        audio.pause();
        // State will be updated via the 'pause' event listener
      }
    };
    
    const handleResumeMusic = () => {
      console.log("Received event to resume background music");
      const audio = audioRef.current;
      if (!audio) return;
      
      // Only resume if it was playing before being paused
      if (wasPlayingBeforePause) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Resume error:", err);
          });
        }
      }
    };
    
    // Subscribe to events
    const unsubscribePause = onAudioEvent('pause-background-music', handlePauseMusic);
    const unsubscribeResume = onAudioEvent('resume-background-music', handleResumeMusic);
    
    // Cleanup event subscriptions
    return () => {
      unsubscribePause();
      unsubscribeResume();
    };
  }, [isPlaying, wasPlayingBeforePause]);
  
  // Preload the audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Set up audio events
    const handleCanPlay = () => {
      console.log("Audio loaded successfully");
      setAudioLoaded(true);
      setDuration(audio.duration || 0);
      setAudioError(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-load next track when current one ends
      loadNextTrack();
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };
    
    const handleError = (e: Event) => {
      console.error("Audio loading error:", e);
      setAudioError(true);
      // Try again with cache-busting
      setTimeout(() => {
        if (audio) {
          const currentSrc = audio.src.split('?')[0];
          audio.src = `${currentSrc}?t=${Date.now()}`;
          audio.load();
        }
      }, 2000);
    };
    
    // Add event listeners
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    
    // Preload audio
    audio.load();
    
    // If already loaded
    if (audio.readyState >= 3) {
      handleCanPlay();
    }
    
    // Cleanup
    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentTrack]);
  
  // Attempt to autoplay
  useEffect(() => {
    if (!audioLoaded || audioError) return;
    
    const audio = audioRef.current;
    if (!audio) return;
    
    // Set the volume
    audio.volume = volume;
    
    // Function to try autoplay
    const tryAutoplay = () => {
      console.log("Attempting to autoplay audio...");
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Autoplay successful!");
          setIsPlaying(true);
        }).catch(error => {
          console.log("Autoplay blocked (normal browser behavior):", error);
          // Most browsers block autoplay without user interaction
          if (!userInteracted) {
            // Show a toast message encouraging user interaction
            toast({
              title: "Cliquez pour activer la musique",
              description: "Les navigateurs requièrent une interaction utilisateur pour lancer l'audio",
              duration: 5000,
            });
          }
        });
      }
    };
    
    // Try autoplay immediately
    tryAutoplay();
    
    // And also try when user interacts with the page
    if (userInteracted) {
      tryAutoplay();
    }
    
  }, [audioLoaded, volume, audioError, userInteracted]);

  // Format time
  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return "0:00";
  };

  // Playback control - Fixed to prevent double-click issue
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      // State will be updated via the 'pause' event listener
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Playback error:", err);
          setIsPlaying(false);
        });
      }
    }
  };

  // Mute control
  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Progress control
  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = parseFloat(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Volume control
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Toggle minimized state
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata" loop={false} />
      
      {isMinimized ? (
        // Minimized player - just a circle with music note
        <div 
          className="fixed left-4 bottom-4 z-40 bg-neon-red rounded-full w-12 h-12 flex items-center justify-center cursor-pointer shadow-[0_0_10px_#D4095D] transition-all hover:scale-105"
          onClick={toggleMinimize}
        >
          <Music className="h-6 w-6 text-white" />
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-2 border-white opacity-30 animate-pulse"></div>
          )}
        </div>
      ) : (
        // Full player
        <div className="fixed left-4 bottom-4 z-40 bg-neon-dark bg-opacity-90 backdrop-blur-sm p-4 rounded-lg border border-neon-red neon-border w-80 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-neon-red truncate">
                {isLoadingTrack ? "Chargement..." : currentTrack?.title || "Musique"}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {currentTrack?.artist || "Himely"}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <div className="text-xs text-gray-400 whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              <button
                onClick={toggleMinimize}
                className="text-white hover:text-neon-red transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Barre de progression */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            step="0.1"
            onChange={handleProgress}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer 
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-neon-red 
                     [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full"
          />
          
          {/* Contrôles */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3">
              <button 
                className="text-white hover:text-neon-red transition-colors"
                onClick={() => {
                  const audio = audioRef.current;
                  if (audio) {
                    audio.currentTime = 0;
                  }
                }}
              >
                <SkipBack className="h-4 w-4" />
              </button>
              
              <button 
                className="p-2 rounded-full bg-neon-red text-white hover:bg-opacity-80 transition-all"
                onClick={togglePlay}
                disabled={isLoadingTrack}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
              
              <button 
                className="text-white hover:text-neon-red transition-colors"
                onClick={loadNextTrack}
                disabled={isLoadingTrack}
              >
                <Shuffle className="h-4 w-4" />
              </button>
              
              <button 
                className="text-white hover:text-neon-red transition-colors"
                onClick={() => {
                  const audio = audioRef.current;
                  if (audio && duration) {
                    audio.currentTime = Math.min(audio.currentTime + 30, duration);
                  }
                }}
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="text-white hover:text-neon-red transition-colors"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolume}
                className="w-14 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-neon-red 
                         [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          </div>
          
          {audioError && (
            <div className="mt-2 text-xs text-red-400">
              Erreur de chargement audio. 
              <button 
                className="ml-2 underline text-neon-red"
                onClick={() => {
                  setAudioError(false);
                  if (audioRef.current && currentTrack) {
                    audioRef.current.src = `/music/background.mp3?t=${Date.now()}`;
                    audioRef.current.load();
                  }
                }}
              >
                Réessayer
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
