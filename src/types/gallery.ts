
export interface GalleryImage {
  id: string;
  name: string;
  url: string;
}

export interface Gallery {
  id: string;
  name: string;
  folderId: string;
  images: GalleryImage[];
}

export type GalleryId = 
  | "galleryMain"
  | "galleryAIDesign"
  | "galleryFig" 
  | "galleryPrint" 
  | "galleryGif"
  | "galleryNSFW";
