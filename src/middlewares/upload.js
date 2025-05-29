import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudordinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'your_project_folder', // Optional: organize uploads
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

export default upload;