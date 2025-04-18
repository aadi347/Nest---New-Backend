import express from "express";
import { userSignup, userLogin, userDashboard } from "../controller/userController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});
router.get("/dashboard", authenticateJWT, userDashboard);

export default router;
