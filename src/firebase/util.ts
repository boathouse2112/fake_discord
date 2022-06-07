import { getBlob, ref } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Download the image with the given source from cloud storage
 * @param imagePath Cloud storage child path of the image
 * @returns Object URL pointing to the downloaded image
 */
export const downloadImage = async (imagePath: string): Promise<string> => {
  const pathRef = ref(storage, imagePath);
  // Get a blob, give it a URL, and return both
  const imageBlob = await getBlob(pathRef);
  return URL.createObjectURL(imageBlob);
};
