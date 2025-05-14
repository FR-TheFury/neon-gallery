
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchImagesFromFolder } from "@/services/googleDriveService";
import { galleries } from "@/config/galleries";
import { GalleryImage } from "@/types/gallery";
import ImageCard from "@/components/ImageCard";
import ImageModal from "@/components/ImageModal";
import ThreeBackground from "@/components/ThreeBackground";
import { useIsMobile } from "@/hooks/use-mobile";

const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const isMobile = useIsMobile();
  
  // Fetch recent images
  const { data: recentImages = [], isLoading } = useQuery({
    queryKey: ["recentImages"],
    queryFn: () => fetchImagesFromFolder(galleries[0].folderId),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return (
    <>
      {/* Hero Section with Static Background */}
      <section className="relative h-screen">
        {/* Static Background Image - THIS IS WHERE THE BACKGROUND IMAGE PATH IS SET */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/src/image/background.png')`,
            willChange: 'opacity'
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neon-dark/30 to-neon-dark"></div>
        
        <ThreeBackground />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gray-200">Explorez les mondes<br/>virtuels de <span className="text-neon-red">VRChat</span></span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-white opacity-90">
            Une collection de moments capturés dans le métavers avec un style cyberpunk néon
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/gallery/galleryMain"
              className="px-6 py-3 rounded-md bg-neon-red text-white font-medium hover:bg-opacity-80 transition-all neon-glow shadow-[0_0_10px_#D4095D]"
            >
              Explorer la galerie
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-md neon-button"
            >
              À propos
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
            <h2 className="text-3xl font-bold neon-text">Photos Récentes</h2>
            <Link to="/gallery/galleryMain" className="text-neon-red hover:text-neon-pink transition-colors">
              Voir Tout
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
      
      {/* Gallery Categories */}
      <section className="py-16 bg-gradient-to-b from-neon-dark to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center neon-text">Catégories de Galerie</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <Link
                key={gallery.id}
                to={`/gallery/${gallery.id}`}
                className="cyberpunk-card p-6 text-center hover:translate-y-[-5px] transition-all border border-neon-darkred hover:border-neon-red hover:shadow-[0_0_10px_rgba(212,9,93,0.5)]"
              >
                <h3 className="text-xl font-bold mb-2 neon-text">{gallery.name}</h3>
                <p className="text-gray-400 mb-4">Explorez la collection {gallery.name}</p>
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 neon-button rounded-md">
                    Voir la Galerie
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
