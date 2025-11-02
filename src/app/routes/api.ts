import express from 'express';
import { exampleController } from '../controllers/example.controller.js';
const router = express.Router();

router.get("/", exampleController);

export default router;