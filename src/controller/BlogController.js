import Blog from "../models/Blog.js";


export const createBlog = async (req, res) => {
  try {
    console.log("Headers:", req.headers);
    console.log("Request Body:", req.body);
    
    const { title, content, category, seoTags } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get uploaded image URL
    console.log("Image URL:", imageUrl);
    console.log("SEO Tags:", seoTags);
    console.log("Category:", category);
    console.log("Title:", title);
    console.log("Content:", content);
    // Validate required fields`

    console.log(imageUrl);

    if (!title || !content || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      seoTags, // Convert string to array if needed
      image: imageUrl, // Save image URL in MongoDB
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error submitting blog:", error);
    res.status(500).json({ message: error.message });
  }
};

  // Get all blogs
  export const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get blog by ID
  export const getBlogById = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
  
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update blog by ID
  export const updateBlogById = async (req, res) => {
    try {
      const { title, content, category, seoTags } = req.body;
  
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, content, category, seoTags },
        { new: true, runValidators: true }
      );
  
      if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
  
      res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete all blogs
  export const deleteAllBlogs = async (req, res) => {
    try {
      await Blog.deleteMany();
      res.status(200).json({ message: "All blogs deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete blog by ID
  export const deleteBlogById = async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
  
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };