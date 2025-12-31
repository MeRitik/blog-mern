import express from 'express';
import { subscribe, unsubscribe } from '../controllers/newsletterController.js';

const router = express.Router();

// POST /api/subscribe - Subscribe to newsletter
router.post('/subscribe', subscribe);

// POST /api/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', unsubscribe);

export default router;
