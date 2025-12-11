
// Service pour récupérer automatiquement les données d'albums SoundCloud via la vraie API
export interface ScrapedTrack {
  title: string;
  url: string;
  duration?: number;
  streamUrl?: string;
  artwork?: string;
}

export interface ScrapedAlbum {
  title: string;
  artist: string;
  coverImage?: string;
  tracks: ScrapedTrack[];
  description?: string;
  releaseDate?: string;
}

// Configuration API SoundCloud - À remplir quand tu auras ta Client ID
const SOUNDCLOUD_CONFIG = {
  CLIENT_ID: '', // Tu ajouteras ta Client ID ici
  API_BASE_URL: 'https://api.soundcloud.com',
};

// Fonction pour extraire l'ID de l'album/playlist depuis l'URL SoundCloud
export const extractAlbumIdFromUrl = (url: string): string | null => {
  // Extraire l'ID de playlist depuis différents formats d'URL SoundCloud
  const patterns = [
    /\/sets\/([^?]+)/,
    /\/playlists\/(\d+)/,
    /api\.soundcloud\.com\/playlists\/(\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

// Fonction pour construire l'URL API SoundCloud
const buildApiUrl = (endpoint: string, params: Record<string, string> = {}) => {
  const url = new URL(`${SOUNDCLOUD_CONFIG.API_BASE_URL}${endpoint}`);
  
  // Ajouter la Client ID à tous les appels
  if (SOUNDCLOUD_CONFIG.CLIENT_ID) {
    url.searchParams.append('client_id', SOUNDCLOUD_CONFIG.CLIENT_ID);
  }
  
  // Ajouter les autres paramètres
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
};

// Récupération des données d'album via la vraie API SoundCloud
export const scrapeAlbumData = async (albumUrl: string): Promise<ScrapedAlbum | null> => {
  try {
    console.log(`Fetching album data from SoundCloud API: ${albumUrl}`);
    
    // Si pas de Client ID configurée, utiliser les données simulées
    if (!SOUNDCLOUD_CONFIG.CLIENT_ID) {
      console.warn('SoundCloud Client ID not configured, using mock data');
      return getMockAlbumData(albumUrl);
    }
    
    // Extraire l'ID de l'album
    const albumId = extractAlbumIdFromUrl(albumUrl);
    if (!albumId) {
      console.error('Could not extract album ID from URL');
      return null;
    }
    
    // Construire l'URL API pour récupérer la playlist
    const apiUrl = buildApiUrl(`/playlists/${albumId}`);
    
    console.log(`Making API request to: ${apiUrl}`);
    
    // Faire l'appel API
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`SoundCloud API error: ${response.status} ${response.statusText}`);
    }
    
    const playlistData = await response.json();
    
    // Transformer les données SoundCloud en format interne
    const album: ScrapedAlbum = {
      title: playlistData.title || 'Unknown Album',
      artist: playlistData.user?.username || 'Unknown Artist',
      coverImage: playlistData.artwork_url || playlistData.tracks?.[0]?.artwork_url,
      description: playlistData.description,
      releaseDate: playlistData.created_at,
      tracks: playlistData.tracks?.map((track: any) => ({
        title: track.title || 'Unknown Track',
        url: track.stream_url ? `${track.stream_url}?client_id=${SOUNDCLOUD_CONFIG.CLIENT_ID}` : '',
        streamUrl: track.stream_url,
        duration: track.duration ? Math.floor(track.duration / 1000) : undefined,
        artwork: track.artwork_url
      })) || []
    };
    
    console.log(`Successfully fetched album: ${album.title} with ${album.tracks.length} tracks`);
    return album;
    
  } catch (error) {
    console.error('Error fetching album data from SoundCloud API:', error);
    
    // Fallback vers les données simulées en cas d'erreur
    console.log('Falling back to mock data');
    return getMockAlbumData(albumUrl);
  }
};

// Données simulées pour le développement (quand l'API n'est pas encore configurée)
const getMockAlbumData = (albumUrl: string): ScrapedAlbum | null => {
  if (albumUrl.includes('fucked-up-vision')) {
    return {
      title: "Fucked Up Vision",
      artist: "Himely",
      coverImage: "/image/FuckedUpVision.png",
      description: "Album de Himely - Fucked Up Vision",
      tracks: [
        {
          title: "Intro - Welcome to the Vision",
          url: "/music/background.mp3",
          duration: 180
        },
        {
          title: "Digital Dreams",
          url: "/music/background.mp3", 
          duration: 240
        },
        {
          title: "Neon Nights",
          url: "/music/background.mp3",
          duration: 200
        },
        {
          title: "Cyber Love",
          url: "/music/background.mp3",
          duration: 220
        },
        {
          title: "Fucked Up Vision (Title Track)",
          url: "/music/background.mp3",
          duration: 280
        }
      ]
    };
  }
  
  if (albumUrl.includes('forevermode')) {
    return {
      title: "Forevermode",
      artist: "Himely",
      coverImage: "/image/Forevermode.png",
      description: "Album de Himely - Forevermode",
      tracks: [
        {
          title: "Boot Sequence",
          url: "/music/background.mp3",
          duration: 180
        },
        {
          title: "Forever Mode",
          url: "/music/background.mp3",
          duration: 240
        },
        {
          title: "Digital Love",
          url: "/music/background.mp3",
          duration: 200
        }
      ]
    };
  }
  
  return null;
};

// Fonction pour mettre à jour la Client ID (tu l'appelleras quand tu auras ta clé)
export const setSoundCloudClientId = (clientId: string) => {
  SOUNDCLOUD_CONFIG.CLIENT_ID = clientId;
  console.log('SoundCloud Client ID configured successfully');
};

// Fonction pour vérifier si l'API est configurée
export const isSoundCloudApiConfigured = (): boolean => {
  return !!SOUNDCLOUD_CONFIG.CLIENT_ID;
};

// Fonction pour convertir les données scrapées en format interne
export const convertScrapedToAlbum = (scraped: ScrapedAlbum, albumId: string, soundcloudUrl: string) => {
  return {
    id: albumId,
    title: scraped.title,
    artist: scraped.artist,
    coverImage: scraped.coverImage,
    soundcloudUrl: soundcloudUrl,
    description: scraped.description,
    releaseDate: scraped.releaseDate,
    tracks: scraped.tracks.map((track, index) => ({
      id: `${albumId}-${index + 1}`,
      title: track.title,
      artist: scraped.artist,
      url: track.url,
      streamUrl: track.streamUrl,
      duration: track.duration,
      artwork: track.artwork
    }))
  };
};
