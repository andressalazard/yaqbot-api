import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
});

export const uploadImageCloudinary = async (filePath: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result && result.url) {
        resolve(result.url);
      } else {
        reject(new Error('Upload failed: No result or URL returned.'));
      }
    });
  });
};

export default cloudinary;
