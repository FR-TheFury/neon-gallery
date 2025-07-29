
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchImagesFromFolder } from "@/services/googleDriveService";
import { galleries } from "@/config/galleries";
import { GalleryImage } from "@/types/gallery";
import ImageCard from "@/components/ImageCard";
import ImageModal from "@/components/ImageModal";
import ThreeBackground from "@/components/ThreeBackground";
import { useIsMobile } from "@/hooks/use-mobile";
import { soundcloudService } from "@/services/soundcloudService";
import { Music } from "lucide-react";

const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const isMobile = useIsMobile();
  const { t } = useTranslation(['home', 'navigation']);
  
  // Fetch recent images
  const { data: recentImages = [], isLoading } = useQuery({
    queryKey: ["recentImages"],
    queryFn: () => fetchImagesFromFolder(galleries[0].folderId),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  // Get albums
  const albums = soundcloudService.getAllAlbums();

  return (
    <>
      {/* Hero Section with Static Background */}
      <section className="relative h-screen">
        {/* Static Background Image - THIS IS WHERE THE BACKGROUND IMAGE PATH IS SET */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/image/background.png')`,
            willChange: 'opacity'
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neon-dark/30 to-neon-dark"></div>
        
        <ThreeBackground />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white text-shadow-soft">{t('home:heroTitle')}<br/>{t('home:heroSubtitle')} <span className="text-neon-red">{t('home:heroHighlight')}</span></span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-white opacity-90">
            {t('home:heroDescription')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/gallery/galleryMain"
              className="px-6 py-3 rounded-md bg-neon-red text-white font-medium hover:bg-opacity-80 transition-all neon-glow shadow-[0_0_10px_#D4095D]"
            >
              {t('home:exploreGallery')}
            </Link>
            <Link
              to="/music"
              className="px-6 py-3 rounded-md bg-neon-red text-white font-medium hover:bg-opacity-80 transition-all neon-glow shadow-[0_0_10px_#D4095D] flex items-center"
            >
              <Music className="mr-2 h-4 w-4" />
              {t('home:listenMyMusic')}
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-md bg-neon-red text-white font-medium hover:bg-opacity-80 transition-all neon-glow shadow-[0_0_10px_#D4095D]"
            >
              {t('home:aboutSection')}
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>
      
      {/* Recent Photos Section */}
      <section className="py-16 bg-neon-dark relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold neon-text">{t('home:recentPhotos')}</h2>
            <Link to="/gallery/galleryMain" className="text-neon-red hover:text-neon-pink transition-colors">
              {t('home:viewAll')}
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-t-neon-red rounded-full animate-spin"></div>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {recentImages.slice(0, isMobile ? 6 : 10).map((image) => (
                  <CarouselItem key={image.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <ImageCard 
                      image={image} 
                      onClick={(image) => setSelectedImage(image)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-1" />
                <CarouselNext className="right-1" />
              </div>
            </Carousel>
          )}
        </div>
      </section>
      
      {/* Albums Section */}
      <section className="py-16 bg-gradient-to-b from-neon-dark to-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold neon-text flex items-center">
              <Music className="mr-3" />
              {t('home:myAlbums')}
            </h2>
            <Link to="/music" className="text-neon-red hover:text-neon-pink transition-colors">
              {t('home:viewAll')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album) => (
              <div
                key={album.id}
                className="cyberpunk-card p-6 hover:translate-y-[-5px] transition-all border border-neon-darkred hover:border-neon-red hover:shadow-[0_0_10px_rgba(212,9,93,0.5)]"
              >
                <div className="aspect-square overflow-hidden rounded-md mb-4 neon-border">
                  <img 
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 neon-text">{album.title}</h3>
                <p className="text-gray-400 mb-4">{t('home:byArtist')} {album.artist}</p>
                <div className="flex gap-2">
                  <Link
                    to="/music"
                    className="flex-1 px-4 py-2 neon-button rounded-md text-center"
                  >
                    {t('home:viewMore')}
                  </Link>
                  {album.soundcloudUrl && (
                    <a
                      href={album.soundcloudUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    >
                      SoundCloud
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Gallery Categories */}
      <section className="py-16 bg-gradient-to-b from-black to-neon-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center neon-text">{t('home:galleryCategories')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <Link
                key={gallery.id}
                to={`/gallery/${gallery.id}`}
                className="cyberpunk-card p-6 text-center hover:translate-y-[-5px] transition-all border border-neon-darkred hover:border-neon-red hover:shadow-[0_0_10px_rgba(212,9,93,0.5)]"
              >
                <h3 className="text-xl font-bold mb-2 neon-text">{t(`navigation:galleries.${gallery.id}`)}</h3>
                <p className="text-gray-400 mb-4">{t('home:exploreCollection')} {t(`navigation:galleries.${gallery.id}`)}</p>
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 neon-button rounded-md">
                    {t('home:viewGallery')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default HomePage;
