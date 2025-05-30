
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronUp, ChevronDown, Music, Shuffle, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { onAudioEvent } from "@/events/audioEvents";
import { soundcloudService, SoundCloudTrack, SoundCloudAlbum } from "@/services/soundcloudService";

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
  const [currentAlbum, setCurrentAlbum] = useState<SoundCloudAlbum | null>(null);
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Initialize with a random album and track
  useEffect(() => {
    // Délai pour permettre au service de charger les données
    const initializePlayer = () => {
      const initialAlbum = soundcloudService.getRandomAlbum();
      const initialTrack = soundcloudService.getRandomTrackFromAlbum(initialAlbum.id);
      setCurrentAlbum(initialAlbum);
      setCurrentTrack(initialTrack);
    };
    
    // Initialiser immédiatement, puis réessayer après un délai si nécessaire
    initializePlayer();
    
    // Réessayer après 1 seconde si les données ne sont pas encore chargées
    const timer = setTimeout(() => {
      if (!currentTrack || currentTrack.title === "Loading track...") {
        initializePlayer();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Load next track in album
  const loadNextTrack = () => {
    if (!currentAlbum || !currentTrack) return;
    
    setIsLoadingTrack(true);
    const nextTrack = soundcloudService.getNextTrackInAlbum(currentAlbum.id, currentTrack.id);
    if (nextTrack) {
      setCurrentTrack(nextTrack);
      setAudioLoaded(false);
      setAudioError(false);
      setCurrentTime(0);
      setDuration(0);
      
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  // Load previous track in album
  const loadPreviousTrack = () => {
    if (!currentAlbum || !currentTrack) return;
    
    setIsLoadingTrack(true);
    const previousTrack = soundcloudService.getPreviousTrackInAlbum(currentAlbum.id, currentTrack.id);
    if (previousTrack) {
      setCurrentTrack(previousTrack);
      setAudioLoaded(false);
      setAudioError(false);
      setCurrentTime(0);
      setDuration(0);
      
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  // Load random album
  const loadRandomAlbum = () => {
    setIsLoadingTrack(true);
    const randomAlbum = soundcloudService.getRandomAlbum();
    const randomTrack = soundcloudService.getRandomTrackFromAlbum(randomAlbum.id);
    
    setCurrentAlbum(randomAlbum);
    setCurrentTrack(randomTrack);
    setAudioLoaded(false);
    setAudioError(false);
    setCurrentTime(0);
    setDuration(0);
    
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

    // Essayer d'abord l'URL SoundCloud, puis fallback vers le fichier local
    const tryLoadAudio = (url: string, fallback = true) => {
      audio.src = url;
      audio.load();
      
      const handleError = () => {
        if (fallback && !url.includes('background.mp3')) {
          console.log('SoundCloud URL failed, falling back to local file');
          tryLoadAudio('/music/background.mp3', false);
        } else {
          setAudioError(true);
        }
        audio.removeEventListener('error', handleError);
      };
      
      audio.addEventListener('error', handleError, { once: true });
    };

    tryLoadAudio(currentTrack.url);
    setIsLoadingTrack(false);
  }, [currentTrack]);

  // Listen for user interaction with the page
  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
    };
    
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
    const handlePauseMusic = () => {
      console.log("Received event to pause background music");
      const audio = audioRef.current;
      if (!audio) return;
      
      setWasPlayingBeforePause(isPlaying);
      
      if (isPlaying && audio) {
        audio.pause();
      }
    };
    
    const handleResumeMusic = () => {
      console.log("Received event to resume background music");
      const audio = audioRef.current;
      if (!audio) return;
      
      if (wasPlayingBeforePause) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Resume error:", err);
          });
        }
      }
    };
    
    const unsubscribePause = onAudioEvent('pause-background-music', handlePauseMusic);
    const unsubscribeResume = onAudioEvent('resume-background-music', handleResumeMusic);
    
    return () => {
      unsubscribePause();
      unsubscribeResume();
    };
  }, [isPlaying, wasPlayingBeforePause]);
  
  // Set up audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
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
      setTimeout(() => {
        if (audio && !audio.src.includes('background.mp3')) {
          console.log("Retrying with local fallback");
          audio.src = "/music/background.mp3";
          audio.load();
        }
      }, 2000);
    };
    
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    
    audio.load();
    
    if (audio.readyState >= 3) {
      handleCanPlay();
    }
    
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
    
    audio.volume = volume;
    
    const tryAutoplay = () => {
      console.log("Attempting to autoplay audio...");
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Autoplay successful!");
          setIsPlaying(true);
        }).catch(error => {
          console.log("Autoplay blocked (normal browser behavior):", error);
          if (!userInteracted) {
            toast({
              title: "Cliquez pour activer la musique",
              description: "Les navigateurs requièrent une interaction utilisateur pour lancer l'audio",
              duration: 5000,
            });
          }
        });
      }
    };
    
    tryAutoplay();
    
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

  // Playback control
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
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

  // Open SoundCloud album
  const openSoundCloudAlbum = () => {
    if (currentAlbum?.soundcloudUrl) {
      window.open(currentAlbum.soundcloudUrl, '_blank');
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata" loop={false} />
      
      {isMinimized ? (
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
        <div className="fixed left-4 bottom-4 z-40 bg-neon-dark bg-opacity-90 backdrop-blur-sm p-4 rounded-lg border border-neon-red neon-border w-80 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-neon-red truncate">
                {isLoadingTrack ? "Chargement..." : currentTrack?.title || "Track"}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {currentAlbum?.title || "Album"} • {currentTrack?.artist || "Himely"}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <div className="text-xs text-gray-400 whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              {currentAlbum?.soundcloudUrl && (
                <button
                  onClick={openSoundCloudAlbum}
                  className="text-white hover:text-neon-red transition-colors"
                  title="Ouvrir sur SoundCloud"
                >
                  <ExternalLink className="h-3 w-3" />
                </button>
              )}
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
                onClick={loadPreviousTrack}
                disabled={isLoadingTrack}
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
                <SkipForward className="h-4 w-4" />
              </button>
              
              <button 
                className="text-white hover:text-neon-red transition-colors"
                onClick={loadRandomAlbum}
                disabled={isLoadingTrack}
              >
                <Shuffle className="h-4 w-4" />
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
