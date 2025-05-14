
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchImagesFromFolder } from "@/services/googleDriveService";
import { galleries } from "@/config/galleries";
import { GalleryImage } from "@/types/gallery";
import ImageCard from "@/components/ImageCard";
import ImageModal from "@/components/ImageModal";
import FloatingCharacter from "@/components/FloatingCharacter";
import { toast } from "@/components/ui/use-toast";

const GalleryPage = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const gallery = galleries.find(g => g.id === galleryId);
  
  if (!gallery) {
    return <Navigate to="/404" />;
  }
  
  const isGifGallery = gallery.id === "galleryGif";
  
  const { data: images = [], isLoading, error, refetch } = useQuery({
    queryKey: ["gallery", gallery.id],
    queryFn: () => fetchImagesFromFolder(gallery.folderId, isGifGallery),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const handleRefresh = () => {
    toast({
      title: "Refreshing gallery",
      description: "Please wait while we fetch the latest images",
    });
    refetch();
  };

  return (
    <>
      <FloatingCharacter count={3} />
      
      <div className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-neon-dark to-black">
        <div className="container-fluid mx-auto px-4 max-w-full">
          <div className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4 neon-text">{gallery.name}</h1>
              <p className="text-lg text-gray-300">
                Explore my {gallery.name.toLowerCase()} collection of VRChat photography.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-neon-purple hover:bg-neon-pink text-white rounded-md transition-colors"
            >
              Refresh Gallery
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-t-neon-purple rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Failed to load gallery</p>
              <button 
                onClick={() => refetch()}
                className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-pink transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No images found in this gallery</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {images.map((image) => (
                <div key={image.id} className="aspect-square">
                  <ImageCard 
                    image={image}
                    onClick={(image) => setSelectedImage(image)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
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

export default GalleryPage;
