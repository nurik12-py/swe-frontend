import imageCompression from "browser-image-compression";

const defaultOptions = {
  maxSizeMB: 0.3,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export default function getCompressedImage(
  imageFile: File,
  options = defaultOptions
) {
  return new Promise(async function (resolve, reject) {
    try {
      return resolve((await imageCompression(imageFile, options)) as File);
    } catch (error) {
      return reject(new Error("Unable to compress image!"));
    }
  });
}
