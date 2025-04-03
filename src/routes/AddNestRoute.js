import express from "express";
import multer from "multer";
import { createProperty, 
    getProperties, 
    getPropertyById, 
    updatePropertyById, 
    deletePropertyById, 
    getPropertiesByLocation, 
    getPropertiesByFlatType,
    getPropertiesByRent,
    getPropertiesByUtilities,
    getPropertiesByParking,
    getPropertiesByCarpetArea
} from "../controller/addNestController.js";

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/createProperty", upload.single("image"), createProperty);
router.get("/getProperties", getProperties);
router.get("/:id/getPropertyById", getPropertyById);
router.put("/:id/updatePropertyById", upload.single("image"), updatePropertyById);
router.delete("/:id/deletePropertyById", deletePropertyById);

// Additional routes for filtering properties

router.get("/location/:location", getPropertiesByLocation);
router.get("/flatType/:flatType", getPropertiesByFlatType);
router.get("/rent/:rent", getPropertiesByRent);
router.get("/utilities/:utilities", getPropertiesByUtilities);
router.get("/parking/:parking", getPropertiesByParking);
router.get("/carpetArea/:carpetArea", getPropertiesByCarpetArea);


export default router;
