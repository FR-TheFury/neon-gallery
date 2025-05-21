
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from "@/components/ui/sonner";
import { emitAudioEvent } from '@/events/audioEvents';

interface FullscreenKeyboardAnimationProps {
    triggerKey?: string;
    cooldownTime?: number; // in milliseconds
    gifUrl?: string;
    soundUrl?: string;
    duration?: number; // in milliseconds
}

// Reuse the global GIF preloader
const preloadedGifs = new Map<string, HTMLImageElement>();

const preloadGif = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Check if already preloaded
        if (preloadedGifs.has(url)) {
            resolve();
            return;
        }
        
        const img = new Image();
        img.onload = () => {
            preloadedGifs.set(url, img);
            resolve();
        };
        img.onerror = () => {
            reject(new Error(`Failed to preload image: ${url}`));
        };
        img.src = url;
    });
};

// Preload audio function
const preloadAudio = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.onloadeddata = () => resolve();
        audio.onerror = () => reject(new Error(`Failed to preload audio: ${url}`));
        audio.src = url;
    });
};

export function FullscreenKeyboardAnimation({
    triggerKey = 'g',
    cooldownTime = 60000, // 1 minute default
    gifUrl = '/image/gay.gif',
    soundUrl = '/music/gay.mp3',
    duration = 3000 // 3 seconds default
}: FullscreenKeyboardAnimationProps) {
    // States for component
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    const [isGifLoaded, setIsGifLoaded] = useState<boolean>(false);
    const [isAudioLoaded, setIsAudioLoaded] = useState<boolean>(false);

    // Audio ref for playing sound
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Refs for tracking state in callbacks and storing timeouts
    const showAnimationRef = useRef<boolean>(false);
    const isCooldownRef = useRef<boolean>(false);
    const hideTimeoutRef = useRef<number | null>(null);
    const cooldownTimeoutRef = useRef<number | null>(null);

    // Keep ref in sync with state
    useEffect(() => {
        showAnimationRef.current = showAnimation;
    }, [showAnimation]);

    // Create audio element immediately
    useEffect(() => {
        // Create audio element right away
        if (!audioRef.current) {
            audioRef.current = new Audio(soundUrl);
            audioRef.current.volume = 1.0; // Set volume to 100%
            console.log("Audio element created immediately with volume at 100%");
        }
        
        return () => {
            // Clean up audio on unmount
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [soundUrl]);

    // Preload the GIF and audio immediately
    useEffect(() => {
        console.log("Starting fullscreen resources preload");
        
        // Preload GIF
        preloadGif(gifUrl)
            .then(() => {
                console.log("Fullscreen GIF preloaded successfully:", gifUrl);
                setIsGifLoaded(true);
            })
            .catch((error) => {
                console.error("Failed to preload fullscreen GIF:", error);
                setIsGifLoaded(true); // Still continue even on error
                toast("Failed to preload animation image", {
                    duration: 3000,
                });
            });
        
        // Preload audio
        preloadAudio(soundUrl)
            .then(() => {
                console.log("Audio preloaded successfully:", soundUrl);
                setIsAudioLoaded(true);
                
                // Ensure audio element is created and has proper volume
                if (audioRef.current) {
                    audioRef.current.volume = 1.0;
                    console.log("Audio volume confirmed at 100%");
                }
            })
            .catch((error) => {
                console.error("Failed to preload audio:", error);
                setIsAudioLoaded(true); // Still continue even on error
                toast("Failed to preload animation sound", {
                    duration: 3000,
                });
            });
    }, [gifUrl, soundUrl]);

    // Clear all timeouts to prevent conflicts
    const clearAllTimeouts = useCallback(() => {
        console.log("Clearing all timeouts for fullscreen animation");

        if (hideTimeoutRef.current) {
            window.clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        if (cooldownTimeoutRef.current) {
            window.clearTimeout(cooldownTimeoutRef.current);
            cooldownTimeoutRef.current = null;
        }
    }, []);

    // Start animation with proper timing sequence
    const triggerAnimation = useCallback(() => {
        console.log("Starting fullscreen animation sequence");

        // Clear existing timeouts
        clearAllTimeouts();

        // Emit event to pause background music before playing animation sound
        emitAudioEvent('pause-background-music');

        // Show animation
        setShowAnimation(true);
        
        // Double check audio element exists, create if needed
        if (!audioRef.current) {
            console.log("Creating audio element on demand");
            audioRef.current = new Audio(soundUrl);
            audioRef.current.volume = 1.0;
        }
        
        // Play sound with forced interaction and volume check
        if (audioRef.current) {
            // Make absolutely sure volume is at maximum
            audioRef.current.volume = 1.0;
            audioRef.current.currentTime = 0; // Reset to start
            
            console.log("Attempting to play animation sound at volume:", audioRef.current.volume);
            
            // Force a load before playing to ensure readiness
            audioRef.current.load();
            
            // Try to play with user gesture simulation
            setTimeout(() => {
                if (audioRef.current) {
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            console.log("Animation sound playing successfully");
                        }).catch(err => {
                            console.error("Failed to play audio:", err);
                            toast("Failed to play sound. Try clicking on the page first.", {
                                duration: 3000,
                            });
                        });
                    }
                }
            }, 100); // Small delay to ensure DOM is ready
        } else {
            console.error("Audio reference not available when trying to play sound");
        }

        // Schedule hide after the duration
        hideTimeoutRef.current = window.setTimeout(() => {
            console.log("Hiding fullscreen animation");
            setShowAnimation(false);
            
            // Stop audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            
            // Emit event to resume background music after animation ends
            emitAudioEvent('resume-background-music');
            
        }, duration);

        // Set cooldown
        isCooldownRef.current = true;

        // Schedule end of cooldown
        cooldownTimeoutRef.current = window.setTimeout(() => {
            console.log("Fullscreen animation cooldown period ended");
            isCooldownRef.current = false;
            toast("Animation disponible à nouveau !", {
                duration: 3000,
            });
        }, cooldownTime);

    }, [duration, cooldownTime, clearAllTimeouts, soundUrl]);

    // Handle key press
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        // Check if the key pressed matches the trigger key (case insensitive)
        if (event.key.toLowerCase() === triggerKey.toLowerCase()) {
            console.log("Fullscreen trigger key pressed, cooldown status:", isCooldownRef.current);

            if (!isCooldownRef.current && isGifLoaded && isAudioLoaded) {
                console.log("Conditions met, triggering fullscreen animation");
                triggerAnimation();
            } else if (isCooldownRef.current) {
                console.log("Fullscreen animation in cooldown");
                toast("Animation en cooldown, veuillez attendre un moment", {
                    duration: 3000,
                });
            } else if (!isGifLoaded || !isAudioLoaded) {
                console.log("Resources not loaded yet");
                toast("Animation en cours de chargement, veuillez patienter", {
                    duration: 3000,
                });
            }
        }
    }, [triggerKey, isGifLoaded, isAudioLoaded, triggerAnimation]);

    // Set up and clean up key press listener
    useEffect(() => {
        console.log("Setting up fullscreen keydown listener");
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            console.log("Cleaning up fullscreen keydown listener and timeouts");
            window.removeEventListener('keydown', handleKeyPress);
            clearAllTimeouts();
            
            // Stop and clean up audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            
            // Make sure to resume background music if component unmounts while animation is showing
            if (showAnimationRef.current) {
                emitAudioEvent('resume-background-music');
            }
        };
    }, [handleKeyPress, clearAllTimeouts]);

    // Only render if animation should be shown
    if (!showAnimation) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="fullscreen-animation animate-fade-in w-full max-w-[95vw] mx-auto border-4 border-neon-red shadow-[0_0_15px_#D4095D,inset_0_0_10px_#D4095D]">
                <img
                    src={gifUrl}
                    alt="Fullscreen Animation"
                    className="w-full h-auto max-h-[90vh] object-contain"
                />
            </div>
        </div>
    );
}

export default FullscreenKeyboardAnimation;
