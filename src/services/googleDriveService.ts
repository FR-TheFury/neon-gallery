
import { GalleryImage } from "@/types/gallery";

const API_KEY = "AIzaSyB5WsFxRU6G95rjFliPZM0suaRTfrCu0xI";
const FALLBACK_IMAGE = "/My-Media/img/fallback.png"; // Replace with actual fallback path

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
  let allImages: GalleryImage[] = [];
  let nextPageToken: string | undefined = undefined;

  do {
    try {
      let url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents`
        + `&key=${API_KEY}&fields=nextPageToken,files(id,name,mimeType)`
        + `&corpora=user&supportsAllDrives=true&pageSize=50`;

      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: DriveResponse = await response.json();
      nextPageToken = data.nextPageToken;

      if (!data.files || data.files.length === 0) {
        console.warn(`No images found in folder ${folderId}`);
        break;
      }

      const filteredFiles = isGifGallery
        ? data.files.filter(file => file.mimeType.includes("gif"))
        : data.files;

      const images = filteredFiles.map(file => ({
        id: file.id,
        name: file.name,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`
      }));

      allImages = [...allImages, ...images];

    } catch (error) {
      console.error(`Error fetching images from folder ${folderId}:`, error);
      break;
    }
  } while (nextPageToken);

  return allImages;
};
