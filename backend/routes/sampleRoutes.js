import express from 'express';
import { getSamples, createSample } from '../controllers/sampleController.js';

const router = express.Router();

router.get('/', getSamples);
router.post('/', createSample);

export default router;
