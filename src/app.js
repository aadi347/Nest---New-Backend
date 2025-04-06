import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import statusMonitor from "express-status-monitor";
import passport from "./config/passportConfig.js";
import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import addNestRoutes from "./routes/AddNestRoute.js";


dotenv.config();
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(statusMonitor());


app.use(cors({
    origin: "http://localhost:5174",  
    credentials: true,
}));



app.use(passport.initialize());

app.use("/users", userRoutes);
app.use("/owners", ownerRoutes);
app.use("/admins", adminRoutes);
app.use("/api", blogRoutes);
app.use("/addNest", addNestRoutes);



const mongodbURL = process.env.MONGODB_URI || 
    "mongodb+srv://NestName:NestName123@nest.hytgw.mongodb.net/?retryWrites=true&w=majority&appName=Nest";

mongoose.connect(mongodbURL)
    .then(() => {
        console.log("Connected to the database");
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`🚀 Server is running on port: ${port}`));
    })
    .catch((error) => console.error("MongoDB Connection Error:", error));
