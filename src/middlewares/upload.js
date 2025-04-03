import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js"; // Import Cloudinary config
import dotenv from "dotenv";
dotenv.config();
// Configure Cloudinary

// Multer storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "property_images", // Folder name in Cloudinary
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;
