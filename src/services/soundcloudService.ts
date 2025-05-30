
export interface SoundCloudTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration?: number;
}

export interface SoundCloudAlbum {
  id: string;
  title: string;
  artist: string;
  tracks: SoundCloudTrack[];
  coverImage?: string;
}

// Albums avec leurs tracks
const himely_albums: SoundCloudAlbum[] = [
  {
    id: "fucked-up-vision",
    title: "Fucked Up Vision",
    artist: "Himely",
    coverImage: "/image/FuckedUpVision.png",
    tracks: [
      {
        id: "fuv-1",
        title: "Track 1",
        artist: "Himely",
        url: "https://api.soundcloud.com/tracks/YOUR_TRACK_ID_1/stream?client_id=YOUR_CLIENT_ID"
      },
      {
        id: "fuv-2", 
        title: "Track 2",
        artist: "Himely",
        url: "https://api.soundcloud.com/tracks/YOUR_TRACK_ID_2/stream?client_id=YOUR_CLIENT_ID"
      },
      {
        id: "fuv-3",
        title: "Track 3", 
        artist: "Himely",
        url: "https://api.soundcloud.com/tracks/YOUR_TRACK_ID_3/stream?client_id=YOUR_CLIENT_ID"
      },
      {
        id: "fuv-4",
        title: "Track 4", 
        artist: "Himely",
        url: "https://api.soundcloud.com/tracks/YOUR_TRACK_ID_4/stream?client_id=YOUR_CLIENT_ID"
      },
      {
        id: "fuv-5",
        title: "Track 5", 
        artist: "Himely",
        url: "https://api.soundcloud.com/tracks/YOUR_TRACK_ID_5/stream?client_id=YOUR_CLIENT_ID"
      }
    ]
  }
  // Tu peux ajouter d'autres albums ici
];

export const soundcloudService = {
  // Récupère tous les albums
  getAllAlbums: (): SoundCloudAlbum[] => {
    return himely_albums;
  },

  // Récupère un album spécifique
  getAlbum: (albumId: string): SoundCloudAlbum | undefined => {
    return himely_albums.find(album => album.id === albumId);
  },

  // Récupère toutes les tracks de tous les albums
  getAllTracks: (): SoundCloudTrack[] => {
    return himely_albums.flatMap(album => album.tracks);
  },

  // Sélectionne un album aléatoire
  getRandomAlbum: (): SoundCloudAlbum => {
    const randomIndex = Math.floor(Math.random() * himely_albums.length);
    return himely_albums[randomIndex];
  },

  // Sélectionne une track aléatoire dans un album spécifique
  getRandomTrackFromAlbum: (albumId: string): SoundCloudTrack | null => {
    const album = himely_albums.find(a => a.id === albumId);
    if (!album || album.tracks.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * album.tracks.length);
    return album.tracks[randomIndex];
  },

  // Sélectionne une track aléatoire de n'importe quel album
  getRandomTrack: (): SoundCloudTrack => {
    const allTracks = soundcloudService.getAllTracks();
    const randomIndex = Math.floor(Math.random() * allTracks.length);
    return allTracks[randomIndex];
  },

  // Récupère la track suivante dans l'album (avec wrap-around)
  getNextTrackInAlbum: (albumId: string, currentTrackId: string): SoundCloudTrack | null => {
    const album = himely_albums.find(a => a.id === albumId);
    if (!album) return null;

    const currentIndex = album.tracks.findIndex(track => track.id === currentTrackId);
    if (currentIndex === -1) return album.tracks[0];

    const nextIndex = (currentIndex + 1) % album.tracks.length;
    return album.tracks[nextIndex];
  },

  // Récupère la track précédente dans l'album (avec wrap-around)
  getPreviousTrackInAlbum: (albumId: string, currentTrackId: string): SoundCloudTrack | null => {
    const album = himely_albums.find(a => a.id === albumId);
    if (!album) return null;

    const currentIndex = album.tracks.findIndex(track => track.id === currentTrackId);
    if (currentIndex === -1) return album.tracks[0];

    const previousIndex = currentIndex === 0 ? album.tracks.length - 1 : currentIndex - 1;
    return album.tracks[previousIndex];
  }
};
