import app from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

const setAvatar = async (userId: string, file: File) => {
  return new Promise(async function (resolve, reject) {
    try {
      const storageRef = ref(storage, `avatars/${userId}`);
      const metadata = {
        cacheControl: "public, max-age=604800",
      };
      const result = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(storageRef);
      console.log(result);
      return resolve(downloadURL);
    } catch (error) {
      console.log(error);
      return reject(new Error("Unable to upload image"));
    }
  });
};

export default setAvatar;
