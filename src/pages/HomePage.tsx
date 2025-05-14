
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchImagesFromFolder } from "@/services/googleDriveService";
import { galleries } from "@/config/galleries";
import { GalleryImage } from "@/types/gallery";
import ImageCard from "@/components/ImageCard";
import ImageModal from "@/components/ImageModal";
import FloatingCharacter from "@/components/FloatingCharacter";
import ThreeBackground from "@/components/ThreeBackground";
import VideoBackground from "@/components/VideoBackground";

const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // Fetch recent images (using main gallery for now)
  const { data: recentImages = [], isLoading } = useQuery({
    queryKey: ["recentImages"],
    queryFn: () => fetchImagesFromFolder(galleries[0].folderId),
  });

  return (
    <>
      <FloatingCharacter />
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen">
        <VideoBackground />
        <ThreeBackground />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse-neon">
            <span className="text-gradient-neon">VRChat Gallery</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 text-white opacity-90">
            Explore my collection of stunning VRChat photography with a neon cyberpunk gothic aesthetic.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/gallery/galleryMain"
              className="px-6 py-3 rounded-md bg-neon-purple text-white font-medium hover:bg-opacity-80 transition-all neon-glow"
            >
              Explore Gallery
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-md border border-neon-purple text-white font-medium hover:bg-neon-purple/20 transition-all"
            >
              About Me
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
            <h2 className="text-3xl font-bold neon-text">Recent Photos</h2>
            <Link to="/gallery/galleryMain" className="text-neon-purple hover:text-neon-pink transition-colors">
              View All
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-t-neon-purple rounded-full animate-spin"></div>
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
                {recentImages.slice(0, 10).map((image) => (
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
          <h2 className="text-3xl font-bold mb-10 text-center neon-text">Gallery Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <Link
                key={gallery.id}
                to={`/gallery/${gallery.id}`}
                className="cyberpunk-card p-6 text-center hover:translate-y-[-5px] transition-all"
              >
                <h3 className="text-xl font-bold mb-2 neon-text">{gallery.name}</h3>
                <p className="text-gray-400 mb-4">Explore {gallery.name} collection</p>
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 border border-neon-purple text-neon-purple rounded-md hover:bg-neon-purple hover:text-white transition-colors">
                    View Gallery
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
