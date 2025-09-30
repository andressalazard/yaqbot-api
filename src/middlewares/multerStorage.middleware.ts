import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { StorageEngine } from 'multer';
import cloudinary from '../config/cloudinary';
import { extname } from 'path';

const storage: StorageEngine = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const newFilename = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + extname(file.originalname);

    return {
      folder: 'yaqbot_photos',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      public_id: newFilename,
    };
  },
});

export default storage;
