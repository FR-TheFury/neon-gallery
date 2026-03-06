
import { GalleryImage } from "@/types/gallery";
import { toast } from "@/components/ui/use-toast";

const API_KEY = "AIzaSyB5WsFxRU6G95rjFliPZM0suaRTfrCu0xI";
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
const fetchWithRetry = async (url: string, options: RequestInit, retries = 3, delay = 1000) => {
  try {
    const response = await fetch(url, options);
    if (response.ok) return response;
    
    if (response.status === 403 || response.status === 429) {
      console.warn(`Rate limited or forbidden (${response.status}), retrying...`);
      toast({
        title: "Loading images...",
        description: "Please wait while we retrieve your images",
        duration: 3000,
      });
      
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2);
      }
    }
    
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const fetchImagesFromFolder = async (
  folderId: string,
  isGifGallery: boolean = false
): Promise<GalleryImage[]> => {
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents`
      + `&key=${API_KEY}&fields=nextPageToken,files(id,name,mimeType)`
      + `&pageSize=1000`;

    const timestamp = new Date().getTime();
    const urlWithTimestamp = `${url}&timestamp=${timestamp}`;

    const response = await fetchWithRetry(
      urlWithTimestamp,
      {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      },
      3,
      1000
    );

    if (response.ok) {
      const data: DriveResponse = await response.json();
      
      if (!data.files || data.files.length === 0) {
        console.warn(`No images found in folder ${folderId}, using fallbacks`);
        toast({
          title: "No images found",
          description: "Using placeholder images instead",
          variant: "destructive",
        });
        return createFallbackImages();
      }

      const filteredFiles = isGifGallery
        ? data.files.filter(file => file.mimeType.includes("gif"))
        : data.files;

      return filteredFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000&t=${timestamp}`
      }));
    } else {
      console.warn(`Error fetching from Google Drive: ${response.status}, using fallbacks`);
      toast({
        title: "Error loading images",
        description: "Could not load images from Google Drive",
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

const createFallbackImages = (): GalleryImage[] => {
  return FALLBACK_IMAGES.map((url, index) => ({
    id: `fallback-${index}`,
    name: `Sample Image ${index + 1}`,
    url
  }));
};