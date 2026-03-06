
import { GalleryImage } from "@/types/gallery";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FALLBACK_IMAGES = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

interface DriveResponse {
  files: DriveFile[];
  nextPageToken?: string;
}

// Implement a retry function with exponential backoff
const fetchWithRetry = async (folderId: string, retries = 3, delay = 1000): Promise<DriveResponse | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('google-drive-proxy', {
      body: { folderId, pageSize: 1000 },
    });

    if (error) {
      console.warn(`Edge function error, retrying...`, error);
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(folderId, retries - 1, delay * 2);
      }
      return null;
    }

    if (data?.error) {
      console.warn(`API error: ${data.error}`);
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(folderId, retries - 1, delay * 2);
      }
      return null;
    }

    return data as DriveResponse;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(folderId, retries - 1, delay * 2);
    }
    return null;
  }
};

export const fetchImagesFromFolder = async (
  folderId: string,
  isGifGallery: boolean = false
): Promise<GalleryImage[]> => {
  try {
    const data = await fetchWithRetry(folderId);
    const timestamp = new Date().getTime();

    if (data && data.files && data.files.length > 0) {
      const filteredFiles = isGifGallery
        ? data.files.filter(file => file.mimeType.includes("gif"))
        : data.files;

      return filteredFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000&t=${timestamp}`
      }));
    } else {
      console.warn(`No images found in folder ${folderId}, using fallbacks`);
      toast({
        title: "No images found",
        description: "Using placeholder images instead",
        variant: "destructive",
      });
      return createFallbackImages();
    }
  } catch (error) {
    console.error(`Error fetching images from folder ${folderId}:`, error);
    toast({
      title: "Error loading images",
      description: "An unexpected error occurred",
      variant: "destructive",
    });
    return createFallbackImages();
  }
};

// Function to create fallback images when Google Drive fails
const createFallbackImages = (): GalleryImage[] => {
  return FALLBACK_IMAGES.map((url, index) => ({
    id: `fallback-${index}`,
    name: `Sample Image ${index + 1}`,
    url
  }));
};