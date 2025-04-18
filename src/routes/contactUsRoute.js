import express from 'express';
import { contactAdmin } from "../controller/contactUsController.js";

const router = express.Router();

router.post("/contactAdmin", contactAdmin);

export default router;