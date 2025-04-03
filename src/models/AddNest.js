import mongoose from "mongoose";

const AddNestSchema = new mongoose.Schema({
  flatType: { type: String, required: true },
  rent: { type: Number, required: true },
  location: { type: String, required: true },
  parking: { type: String, required: true },
  utilities: { type: String, required: true },
  houseName: { type: String, required: true },
  deposit: { type: Number, required: true },
  carpetArea: { type: Number, required: true },
  imageUrl: { type: String, required: true }, // Cloudinary image URL
});

const Property = mongoose.model("Property", AddNestSchema);
export default Property;
