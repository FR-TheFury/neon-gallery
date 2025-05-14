
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Charger et lire automatiquement la musique
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Configurer les événements audio
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      // Lecture automatique (avec délai pour permettre le chargement)
      const timer = setTimeout(() => {
        audio.volume = volume;
        audio.play().catch(error => {
          console.log("Lecture automatique bloquée:", error);
          // La plupart des navigateurs bloquent la lecture auto sans interaction utilisateur
        });
        setIsPlaying(true);
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('timeupdate', () => {});
        audio.removeEventListener('ended', () => {});
      };
    }
  }, []);

  // Formatage du temps
  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return "0:00";
  };

  // Contrôle de la lecture
  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(err => console.log("Erreur de lecture:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Contrôle du volume
  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Gestion de la progression
  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = parseFloat(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Gestion du volume
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <div className="fixed left-4 bottom-4 z-40 bg-neon-dark bg-opacity-90 backdrop-blur-sm p-4 rounded-lg border border-neon-red neon-border w-72">
      <audio ref={audioRef} src="/src/music/background.mp3" preload="metadata" />
      
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-neon-red truncate">Musique de fond</div>
        <div className="text-xs text-gray-400">
          {formatTime(currentTime)} / {formatTime(duration)}
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
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-neon-red transition-colors">
            <SkipBack className="h-4 w-4" />
          </button>
          
          <button 
            className="p-2 rounded-full bg-neon-red text-white hover:bg-opacity-80 transition-all"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
          
          <button className="text-white hover:text-neon-red transition-colors">
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
    </div>
  );
};

export default AudioPlayer;
