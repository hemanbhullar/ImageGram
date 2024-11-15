import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_ACCESS_KEY } from './serverConfig.js';

export const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: CLOUDINARY_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_SECRET_ACCESS_KEY,
    })
}