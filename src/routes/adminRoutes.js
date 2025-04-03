import express from "express";
import { adminSignup, adminLogin, adminDashboard } from "../controller/adminController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin signup
router.post("/signup", adminSignup);

// Admin login
router.post("/login", adminLogin);

// Admin dashboard (protected route)
router.get("/dashboard", authenticateJWT, adminDashboard);

export default router;
