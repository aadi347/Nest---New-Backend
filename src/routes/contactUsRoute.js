import express from 'express';
import { contactAdmin, getAllContacts } from "../controller/contactUsController.js";

const router = express.Router();

router.post("/contactAdmin", contactAdmin);
router.get("/getAllContacts", getAllContacts);

export default router;