import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "prep_audio_upload"); // your preset name

  const cloudName = "dmjuls5b6"; // replace with actual

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    formData
  );

  return res.data.secure_url; // this is the public audio URL
};
