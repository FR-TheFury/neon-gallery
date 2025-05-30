
import { scrapeAlbumData, convertScrapedToAlbum, extractAlbumIdFromUrl } from './soundcloudScraper';

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
  soundcloudUrl?: string;
}

// Albums avec données automatiquement récupérées
let himely_albums: SoundCloudAlbum[] = [];

// Fonction pour initialiser les albums avec les vraies données
export const initializeAlbumsFromUrls = async (albumUrls: string[]) => {
  const albums: SoundCloudAlbum[] = [];
  
  for (const url of albumUrls) {
    try {
      const albumId = extractAlbumIdFromUrl(url);
      if (!albumId) continue;
      
      const scrapedData = await scrapeAlbumData(url);
      if (scrapedData) {
        const album = convertScrapedToAlbum(scrapedData, albumId, url);
        albums.push(album);
      }
    } catch (error) {
      console.error(`Failed to load album from ${url}:`, error);
    }
  }
  
  himely_albums = albums;
  console.log(`Loaded ${albums.length} albums automatically`);
};

// URLs des albums à charger automatiquement
const ALBUM_URLS = [
  "https://soundcloud.com/himely_pup/sets/fucked-up-vision?si=1470bbf087f7455fb6b1568ee3159205&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
];

// Initialisation automatique au chargement du service
initializeAlbumsFromUrls(ALBUM_URLS);

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
    if (himely_albums.length === 0) {
      // Fallback si aucun album n'est chargé
      return {
        id: "fallback",
        title: "Loading...",
        artist: "Himely",
        tracks: [{
          id: "fallback-1",
          title: "Loading track...",
          artist: "Himely",
          url: "/music/background.mp3"
        }]
      };
    }
    
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
    if (allTracks.length === 0) {
      // Fallback si aucune track n'est disponible
      return {
        id: "fallback-1",
        title: "Loading track...",
        artist: "Himely",
        url: "/music/background.mp3"
      };
    }
    
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
  },

  // Ajouter un nouvel album via son URL
  addAlbumFromUrl: async (albumUrl: string): Promise<boolean> => {
    try {
      const albumId = extractAlbumIdFromUrl(albumUrl);
      if (!albumId) return false;
      
      // Vérifier si l'album existe déjà
      if (himely_albums.find(a => a.id === albumId)) {
        console.log('Album already exists');
        return true;
      }
      
      const scrapedData = await scrapeAlbumData(albumUrl);
      if (scrapedData) {
        const album = convertScrapedToAlbum(scrapedData, albumId, albumUrl);
        himely_albums.push(album);
        console.log(`Added album: ${album.title}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error adding album:', error);
      return false;
    }
  }
};
