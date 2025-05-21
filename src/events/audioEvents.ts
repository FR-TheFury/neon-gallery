
// Simple event system for audio coordination between components
type AudioEventType = 'pause-background-music' | 'resume-background-music';

type AudioEventCallback = () => void;

// Store event listeners
const listeners: Record<AudioEventType, AudioEventCallback[]> = {
  'pause-background-music': [],
  'resume-background-music': [],
};

// Emit an event to all listeners
export const emitAudioEvent = (eventType: AudioEventType): void => {
  console.log(`Audio event emitted: ${eventType}`);
  listeners[eventType].forEach(callback => callback());
};

// Subscribe to an event
export const onAudioEvent = (eventType: AudioEventType, callback: AudioEventCallback): () => void => {
  listeners[eventType].push(callback);
  console.log(`Listener added for: ${eventType}, total listeners: ${listeners[eventType].length}`);
  
  // Return unsubscribe function
  return () => {
    const index = listeners[eventType].indexOf(callback);
    if (index !== -1) {
      listeners[eventType].splice(index, 1);
      console.log(`Listener removed for: ${eventType}, remaining listeners: ${listeners[eventType].length}`);
    }
  };
};
