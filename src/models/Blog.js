
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Technology", "Business", "Lifestyle", "Health"], // Define categories
    },
    seoTags: {
      type: [String], // Array of strings for multiple SEO tags
      default: [],
    },
    image: {
        type: String, 
        required: false 
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model("Blog", blogSchema);
