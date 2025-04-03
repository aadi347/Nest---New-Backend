import Property from "../models/AddNest.js";
import cloudinary from "../config/cloudinaryConfig.js";

export const createProperty = async (req, res) => {
  try {
    const { flatType, rent, location, parking, utilities, houseName, deposit, carpetArea } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image upload is required" });
    }

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, { folder: "properties" });

    const property = new Property({
      flatType,
      rent,
      location,
      parking,
      utilities,
      houseName,
      deposit,
      carpetArea,
      imageUrl: uploadedImage.secure_url,
    });

    await property.save();
    res.status(201).json({ success: true, message: "Property listed successfully", property });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    res.status(200).json({ success: true, property });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updatePropertyById = async (req, res) => {
  try {
    const updatedData = req.body;

    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, { folder: "properties" });
      updatedData.imageUrl = uploadedImage.secure_url;
    }

    const property = await Property.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, message: "Property updated successfully", property });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const deletePropertyById = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPropertiesByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const properties = await Property.find({ location: { $regex: location, $options: "i" } });
    
    if (properties.length === 0) {
      return res.status(404).json({ success: false, message: "No properties found in this location" });
    }

    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getPropertiesByFlatType = async (req, res) => {
  try {
    const { flatType } = req.params;
    const properties = await Property.find({ flatType: { $regex: flatType, $options: "i" } });
    
    if (properties.length === 0) {
      return res.status(404).json({ success: false, message: "No properties found with this flat type" });
    }

    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getPropertiesByRent = async (req, res) => {
  try {
    const { rent } = req.params;
    const properties = await Property.find({ rent: { $lte: rent } });
    
    if (properties.length === 0) {
      return res.status(404).json({ success: false, message: "No properties found within this rent range" });
    }

    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPropertiesByUtilities = async (req, res) => {
  try {
    const { utilities } = req.params;
    const properties = await Property.find({ utilities: { $regex: utilities, $options: "i" } });
    
    if (properties.length === 0) {
      return res.status(404).json({ success: false, message: "No properties found with these utilities" });
    }

    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getPropertiesByParking = async (req, res) => {
  try {
    const { parking } = req.params;
    const properties = await Property.find({ parking: { $regex: parking, $options: "i" } });
    
    if (properties.length === 0) {
      return res.status(404).json({ success: false, message: "No properties found with this parking type" });
    }

    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPropertiesByCarpetArea = async (req, res) => {
  try {
    const { carpetArea } = req.params;
    const properties = await Property.find({ carpetArea: { $gte: carpetArea } });
    
    if (properties.length === 0) {
      return res.status(404).json({ success: false, message: "No properties found with this carpet area" });
    }

    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
