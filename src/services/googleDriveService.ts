
import { GalleryImage } from "@/types/gallery";

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

export const fetchImagesFromFolder = async (
  folderId: string,
  isGifGallery: boolean = false
): Promise<GalleryImage[]> => {
  try {
    // First try to load from Google Drive
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents`
      + `&key=${API_KEY}&fields=nextPageToken,files(id,name,mimeType)`
      + `&pageSize=50`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    // If Google Drive request is successful
    if (response.ok) {
      const data: DriveResponse = await response.json();
      
      if (!data.files || data.files.length === 0) {
        console.warn(`No images found in folder ${folderId}, using fallbacks`);
        return createFallbackImages();
      }

      const filteredFiles = isGifGallery
        ? data.files.filter(file => file.mimeType.includes("gif"))
        : data.files;

      return filteredFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`
      }));
    } else {
      // Handle 403 errors or other issues
      console.warn(`Error fetching from Google Drive: ${response.status}, using fallbacks`);
      return createFallbackImages();
    }
  } catch (error) {
    console.error(`Error fetching images from folder ${folderId}:`, error);
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
