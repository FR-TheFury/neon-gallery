
import { Music, Headphones, Volume2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const MusicPage = () => {
  const albums = [
    {
      id: 1,
      title: "Fucked Up Vision",
      image: "/image/FuckedUpVision.png"
    },
    {
      id: 2,
      title: "Digital Dreams",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Neon Nights",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Cyber Soul",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-dark via-black to-neon-darkpurple pt-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient-neon mb-4 animate-pulse-neon">
            MUSIC
          </h1>
          <p className="text-xl text-neon-pink neon-text">
            L'Expression de mon Âme à travers les Sons
          </p>
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="cyberpunk-card p-8 neon-border">
              <h2 className="text-3xl font-bold text-neon-red mb-6 flex items-center">
                <Music className="mr-3" />
                Mon Univers Musical
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Welcome to my sonic universe, a space where my emotions come to life through beats and melodies.
                  Every track I create is a fragment of my soul, a digital fingerprint of my most intense experiences.
                </p>
                <p>
                  My music is born from the fusion of my shifting moods and personal experiences.
                  From the chaos of sleepless nights to the euphoria of moments of freedom, every sound tells an authentic story.
                </p>
                <p className="text-neon-pink font-semibold">
                  In this world where the virtual and the real collide, my music becomes the bridge between who I am and who I dream of being.
                </p>
                <p>
                  Let yourself be carried away by these electronic vibrations, these basslines that shake the soul,
                  and these melodies that transcend the boundaries between the physical and the digital.
                </p>
              </div>
            </div>

            {/* Platform Links */}
            <div className="cyberpunk-card p-6 neon-border">
              <h3 className="text-xl font-bold text-neon-red mb-4 flex items-center">
                <Headphones className="mr-2" />
                Retrouvez-moi sur
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="neon-button p-3 text-center rounded-md cursor-not-allowed opacity-50">
                  <Volume2 className="mx-auto mb-2" />
                  <span className="text-sm">Spotify</span>
                  <div className="text-xs text-neon-pink mt-1">In Coming</div>
                </div>
                <div className="neon-button p-3 text-center rounded-md cursor-not-allowed opacity-50">
                  <Volume2 className="mx-auto mb-2" />
                  <span className="text-sm">Deezer</span>
                  <div className="text-xs text-neon-pink mt-1">In Coming</div>
                </div>
                <div className="neon-button p-3 text-center rounded-md cursor-not-allowed opacity-50">
                  <Volume2 className="mx-auto mb-2" />
                  <span className="text-sm">SoundCloud</span>
                  <div className="text-xs text-neon-pink mt-1">Available</div>
                </div>
                <div className="neon-button p-3 text-center rounded-md cursor-not-allowed opacity-50">
                  <Volume2 className="mx-auto mb-2" />
                  <span className="text-sm">YouTube</span>
                  <div className="text-xs text-neon-pink mt-1">In Coming</div>
                </div>
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
            Mes Albums
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {albums.map((album) => (
                <CarouselItem key={album.id} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/4">
                  <div className="cyberpunk-card p-4 neon-border hover:shadow-[0_0_20px_rgba(212,9,93,0.8)] transition-all duration-300">
                    <div className="aspect-square overflow-hidden rounded-md mb-4 neon-border">
                      <img 
                        src={album.image}
                        alt={album.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-neon-pink text-center neon-text">
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
            Fucked Up Vision - Ma Playlist Actuelle
          </h2>
          <div className="bg-black/50 p-4 rounded-lg neon-border">
            <iframe 
              width="100%" 
              height="450" 
              scrolling="no" 
              frameBorder="no" 
              allow="autoplay" 
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2029378521&color=%23ed0055&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true"
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
                  href="https://soundcloud.com/himely_pup/sets/fucked-up-vision" 
                  title="Fucked Up Vision" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neon-pink hover:text-neon-red transition-colors"
                >
                  Fucked Up Vision
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-12">
          <p className="text-2xl font-bold text-gradient-neon animate-pulse-neon">
            "La musique est l'écho de mon âme digitale"
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
