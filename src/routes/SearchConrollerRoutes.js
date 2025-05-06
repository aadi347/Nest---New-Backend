import express from 'express';
import { searchController } from '../controller/SearchConroller.js';

const router = express.Router();

router.get('/', searchController);

export default router;