import {v2 as cloudinary} from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// instance of cloudinary storage
export const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png", "jpeg", "mov", "svg"],
    params: {
        folder: "Medications",
        transformation: [{width: 100, height: 150, crop: "limit"}]
    }
})

export default storage;