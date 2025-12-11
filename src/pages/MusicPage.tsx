import { useState } from "react";
import { Music, Headphones } from "lucide-react";
import { SiSpotify, SiSoundcloud, SiAmazonmusic, SiYoutube, SiApplemusic } from "react-icons/si";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";

const MusicPage = () => {
  const { t } = useTranslation('music');
  const [selectedAlbum, setSelectedAlbum] = useState<string>("forevermode");

  const albumIframes = {
    "fucked-up-vision": {
      title: "Fucked Up Vision",
      src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1744426083&color=%23ff006b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
      link: "https://soundcloud.com/himely_pup/sets/fucked-up-vision"
    },
    "forevermode": {
      title: "Forevermode",
      src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2228096762&color=%23ff006b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
      link: "https://soundcloud.com/himely_pup/sets/forevermode"
    }
  };
  const albums = [
    {
      id: 1,
      title: "Fucked Up Vision",
      image: "/image/FuckedUpVision.png",
      status: "available"
    },
    {
      id: 2,
      title: "Forevermode",
      image: "/image/Forevermode.png",
      status: "available"
    },
    {
      id: 3,
      title: t('comingSoon'),
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
      status: "coming-soon"
    },
    {
      id: 4,
      title: t('comingSoon'),
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop",
      status: "coming-soon"
    }
  ];

  // Custom Deezer icon component since SiDeezer doesn't exist
  const DeezerIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M18.81 12.74h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm-4.09 1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm-4.09 2.96h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm-4.09 4.44h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74z"/>
    </svg>
  );

  const musicPlatforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/intl-fr/artist/0Lms7v1qvEfqjLRGMCJUuY?si=Sfp8IoYlReibnmQwRIjXDg",
      icon: SiSpotify,
      color: "text-green-500",
      status: "available"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/fr/artist/himely/1818506619",
      icon: SiApplemusic,
      color: "text-white",
      status: "available"
    },
    {
      name: "Deezer",
      url: "https://www.deezer.com/fr/artist/328787671",
      icon: DeezerIcon,
      color: "text-orange-500",
      status: "available"
    },
    {
      name: "SoundCloud",
      url: "https://soundcloud.com/himely_pup",
      icon: SiSoundcloud,
      color: "text-orange-600",
      status: "available"
    },
    {
      name: "YouTube Music",
      url: "https://www.youtube.com/@Himely_pup",
      icon: SiYoutube,
      color: "text-red-500",
      status: "available"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.fr/artists/B0FBWJHY47/himely",
      icon: SiAmazonmusic,
      color: "text-blue-500",
      status: "available"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-dark via-black to-neon-darkpurple pt-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-neon mb-4 animate-pulse-neon">
            {t('title').toUpperCase()}
          </h1>
          <p className="text-xl text-neon-pink neon-text">
            {t('subtitle')}
          </p>
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="cyberpunk-card p-8 neon-border">
              <h2 className="text-3xl font-bold text-neon-red mb-6 flex items-center">
                <Music className="mr-3" />
                {t('musicalUniverse')}
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  {t('description1')}
                </p>
                <p>
                  {t('description2')}
                </p>
                <p className="text-neon-pink font-semibold">
                  {t('description3')}
                </p>
                <p>
                  {t('description4')}
                </p>
              </div>
            </div>

            {/* Platform Links */}
            <div className="cyberpunk-card p-6 neon-border">
              <h3 className="text-xl font-bold text-neon-red mb-4 flex items-center">
                <Headphones className="mr-2" />
                {t('findMeOn')}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {musicPlatforms.map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <div key={platform.name}>
                      {platform.status === "available" ? (
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neon-button p-3 text-center rounded-md hover:shadow-[0_0_20px_rgba(212,9,93,0.8)] transition-all duration-300 block"
                        >
                          <div className="mx-auto mb-2 w-6 h-6 flex items-center justify-center">
                            <IconComponent className={`w-6 h-6 ${platform.color}`} />
                          </div>
                          <span className="text-sm">{platform.name}</span>
                          <div className="text-xs text-neon-pink mt-1">{t('available')}</div>
                        </a>
                      ) : (
                        <div className="neon-button p-3 text-center rounded-md cursor-not-allowed opacity-50">
                          <div className="mx-auto mb-2 w-6 h-6 flex items-center justify-center">
                            <IconComponent className={`w-6 h-6 ${platform.color}`} />
                          </div>
                          <span className="text-sm">{platform.name}</span>
                          <div className="text-xs text-neon-pink mt-1">{t('comingSoon')}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="/image/OcMusic.png"
                alt="Himely Music" 
                className="max-w-full h-auto rounded-lg shadow-2xl neon-border animate-pulse-soft"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-red/20 to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Albums Carousel */}
        <div className="cyberpunk-card p-8 neon-border mb-8">
          <h2 className="text-3xl font-bold text-neon-red mb-6 text-center">
            {t('myAlbums')}
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {albums.map((album) => (
                <CarouselItem key={album.id} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/4">
                  <div className={`cyberpunk-card p-4 neon-border transition-all duration-300 ${
                    album.status === 'available' 
                      ? 'hover:shadow-[0_0_20px_rgba(212,9,93,0.8)]' 
                      : 'opacity-70'
                  }`}>
                    <div className="aspect-square overflow-hidden rounded-md mb-4 neon-border relative">
                      <img 
                        src={album.image}
                        alt={album.title}
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          album.status === 'available' ? 'hover:scale-105' : 'filter grayscale'
                        }`}
                      />
                      {album.status === 'coming-soon' && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-neon-pink font-bold text-lg neon-text">{t('soon').toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <h3 className={`text-lg font-semibold text-center neon-text ${
                      album.status === 'available' ? 'text-neon-pink' : 'text-gray-400'
                    }`}>
                      {album.title}
                    </h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="neon-button" />
            <CarouselNext className="neon-button" />
          </Carousel>
        </div>

        {/* SoundCloud Integration */}
        <div className="cyberpunk-card p-8 neon-border">
          <h2 className="text-3xl font-bold text-neon-red mb-6 text-center">
            {t('selectAlbum')}
          </h2>
          
          {/* Album Tabs */}
          <div className="flex justify-center gap-4 mb-6">
            {Object.entries(albumIframes).map(([key, album]) => (
              <button
                key={key}
                onClick={() => setSelectedAlbum(key)}
                className={`px-6 py-3 rounded-md font-bold transition-all duration-300 ${
                  selectedAlbum === key
                    ? 'bg-neon-red text-white shadow-[0_0_20px_rgba(212,9,93,0.8)] neon-glow'
                    : 'neon-button hover:shadow-[0_0_15px_rgba(212,9,93,0.5)]'
                }`}
              >
                {album.title}
              </button>
            ))}
          </div>

          <div className="bg-black/50 p-4 rounded-lg neon-border">
            <iframe 
              key={selectedAlbum}
              width="100%" 
              height="300" 
              scrolling="no" 
              frameBorder="no" 
              allow="autoplay" 
              src={albumIframes[selectedAlbum as keyof typeof albumIframes].src}
              className="rounded-md"
            ></iframe>
            <div className="mt-4 text-center">
              <div className="text-xs text-gray-400 leading-relaxed">
                <a 
                  href="https://soundcloud.com/himely_pup" 
                  title="Himely" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neon-pink hover:text-neon-red transition-colors"
                >
                  Himely
                </a>
                {" · "}
                <a 
                  href={albumIframes[selectedAlbum as keyof typeof albumIframes].link}
                  title={albumIframes[selectedAlbum as keyof typeof albumIframes].title}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neon-pink hover:text-neon-red transition-colors"
                >
                  {albumIframes[selectedAlbum as keyof typeof albumIframes].title}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-12">
          <p className="text-2xl font-bold text-gradient-neon animate-pulse-neon">
            {t('quote')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
