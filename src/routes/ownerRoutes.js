import express from "express";
import { ownerSignup, ownerLogin, ownerDashboard } from "../controller/ownerController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Owner signup
router.post("/signup", ownerSignup);

// Owner login
router.post("/login", ownerLogin);

// Owner dashboard (protected route)
router.get("/dashboard", authenticateJWT, ownerDashboard);

export default router;
