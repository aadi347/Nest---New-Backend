import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required:true,
        },
        name: {
            type: String,
            required:true,
        },

        phone: {
            type: Number,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
)

export default mongoose.model("ContactUs", contactSchema);