
export interface SoundCloudTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration?: number;
}

// Liste statique de vos tracks SoundCloud (à mettre à jour avec vos vraies URLs)
const himely_tracks: SoundCloudTrack[] = [
  {
    id: "1",
    title: "Fucked Up Vision - Track 1",
    artist: "Himely",
    url: "https://api.soundcloud.com/tracks/YOUR_TRACK_ID_1/stream?client_id=YOUR_CLIENT_ID"
  },
  {
    id: "2", 
    title: "Fucked Up Vision - Track 2",
    artist: "Himely",
    url: "https://api.soundcloud.com/tracks/YOUR_TRACK_ID_2/stream?client_id=YOUR_CLIENT_ID"
  },
  {
    id: "3",
    title: "Fucked Up Vision - Track 3", 
    artist: "Himely",
    url: "https://api.soundcloud.com/tracks/YOUR_TRACK_ID_3/stream?client_id=YOUR_CLIENT_ID"
  }
  // Ajoutez plus de tracks ici
];

export const soundcloudService = {
  // Récupère toutes les tracks disponibles
  getAllTracks: (): SoundCloudTrack[] => {
    return himely_tracks;
  },

  // Sélectionne une track aléatoire
  getRandomTrack: (): SoundCloudTrack => {
    const tracks = himely_tracks;
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex];
  },

  // Récupère une track différente de celle actuellement jouée
  getNextRandomTrack: (currentTrackId?: string): SoundCloudTrack => {
    const tracks = himely_tracks;
    if (!currentTrackId || tracks.length <= 1) {
      return soundcloudService.getRandomTrack();
    }
    
    let nextTrack;
    do {
      nextTrack = soundcloudService.getRandomTrack();
    } while (nextTrack.id === currentTrackId && tracks.length > 1);
    
    return nextTrack;
  }
};
