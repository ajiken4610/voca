import { ref as storageRef, uploadString } from "firebase/storage";

export default async (path: string, data: string) => {
  const reference = storageRef(useStorage(), path);
  return await uploadString(reference, data);
};
