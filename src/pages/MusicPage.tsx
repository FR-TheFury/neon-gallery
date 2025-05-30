
import { Music, Headphones, Volume2 } from "lucide-react";

const MusicPage = () => {
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
                  Bienvenue dans mon univers sonore, un espace où mes émotions prennent vie à travers les beats et les mélodies. 
                  Chaque track que je crée est un fragment de mon âme, une empreinte digitale de mes vécus les plus intenses.
                </p>
                <p>
                  Ma musique naît de la fusion entre mes humeurs changeantes et mes expériences personnelles. 
                  Du chaos de mes nuits blanches aux euphories de mes moments de liberté, chaque son raconte une histoire authentique.
                </p>
                <p className="text-neon-pink font-semibold">
                  Dans ce monde virtuel et réel qui se mélangent, ma musique devient le pont entre qui je suis et qui je rêve d'être.
                </p>
                <p>
                  Laissez-vous porter par ces vibrations électroniques, ces basslines qui font trembler l'âme, 
                  et ces mélodies qui transcendent les frontières entre le physique et le digital.
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
                  <span className="text-sm">Apple Music</span>
                  <div className="text-xs text-neon-pink mt-1">In Coming</div>
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
                src="/lovable-uploads/39b9b9ca-3265-44e4-bfae-b2b847ead63a.png" 
                alt="Himely Music" 
                className="max-w-full h-auto rounded-lg shadow-2xl neon-border animate-pulse-soft"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-red/20 to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>
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
