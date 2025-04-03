import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js"; // Import Cloudinary config
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteAllBlogs,
  deleteBlogById,
} from "../controller/BlogController.js";

const router = express.Router();

// Configure Multer to Upload Images to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogImages", // Cloudinary folder name
    format: async (req, file) => "png", // Convert all uploads to PNG
    public_id: (req, file) => file.originalname.split(".")[0], // Use filename as public_id
  },
});

const upload = multer({ storage });

// Routes
router.post("/createBlog", upload.single("image"), createBlog); // Upload image while creating a blog
router.get("/getAllBlogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/updateBlog/:id", updateBlogById);
router.delete("/deleteAllBlogs", deleteAllBlogs);
router.delete("/deleteBlogs/:id", deleteBlogById);

export default router;
