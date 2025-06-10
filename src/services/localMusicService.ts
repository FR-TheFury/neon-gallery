
export interface LocalTrack {
  id: string;
  title: string;
  artist: string;
  filename: string;
  url: string;
}

class LocalMusicService {
  private tracks: LocalTrack[] = [
    {
      id: "1",
      title: "Battements irréguliers",
      artist: "Himely",
      filename: "Battements irréguliers.wav",
      url: "/music/player/Battements irréguliers.wav"
    },
    {
      id: "2", 
      title: "Coeur en 404",
      artist: "Himely",
      filename: "Coeur en 404.wav",
      url: "/music/player/Coeur en 404.wav"
    },
    {
      id: "3",
      title: "Cœur Mécanique", 
      artist: "Himely",
      filename: "Cœur Mécanique.wav",
      url: "/music/player/Cœur Mécanique.wav"
    },
    {
      id: "4",
      title: "HEARTRATE AFTERGLOW",
      artist: "Himely", 
      filename: "HEARTRATE AFTERGLOW.wav",
      url: "/music/player/HEARTRATE AFTERGLOW.wav"
    },
    {
      id: "5",
      title: "Heartrate Overdrive",
      artist: "Himely",
      filename: "Heartrate Overdrive.wav", 
      url: "/music/player/Heartrate Overdrive.wav"
    },
    {
      id: "6",
      title: "Née du Chaos",
      artist: "Himely",
      filename: "Née du Chaos.wav",
      url: "/music/player/Née du Chaos.wav"
    },
    {
      id: "7",
      title: "Running in Overdrive", 
      artist: "Himely",
      filename: "Running in Overdrive.wav",
      url: "/music/player/Running in Overdrive.wav"
    },
    {
      id: "8",
      title: "Shadows in Neon",
      artist: "Himely",
      filename: "Shadows in Neon.wav",
      url: "/music/player/Shadows in Neon.wav"
    },
    {
      id: "9",
      title: "Tout est flou d'en haut",
      artist: "Himely", 
      filename: "Tout est flou d'en haut.wav",
      url: "/music/player/Tout est flou d'en haut.wav"
    },
    {
      id: "10",
      title: "UPRISING",
      artist: "Himely",
      filename: "UPRISING.wav",
      url: "/music/player/UPRISING.wav"
    }
  ];

  private currentTrackIndex: number = 0;

  constructor() {
    this.shuffleTracks();
  }

  private shuffleTracks() {
    for (let i = this.tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
    }
    this.currentTrackIndex = 0;
  }

  getRandomTrack(): LocalTrack {
    const randomIndex = Math.floor(Math.random() * this.tracks.length);
    this.currentTrackIndex = randomIndex;
    return this.tracks[randomIndex];
  }

  getCurrentTrack(): LocalTrack {
    return this.tracks[this.currentTrackIndex];
  }

  getNextTrack(): LocalTrack {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    return this.tracks[this.currentTrackIndex];
  }

  getPreviousTrack(): LocalTrack {
    this.currentTrackIndex = this.currentTrackIndex === 0 
      ? this.tracks.length - 1 
      : this.currentTrackIndex - 1;
    return this.tracks[this.currentTrackIndex];
  }

  getAllTracks(): LocalTrack[] {
    return this.tracks;
  }

  getTrackCount(): number {
    return this.tracks.length;
  }
}

export const localMusicService = new LocalMusicService();
