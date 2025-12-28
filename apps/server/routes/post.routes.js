import express from 'express';
import { createPost } from '../controllers/postController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create a new post (requires authentication)
router.post('/posts', authenticateToken, createPost);

export default router;
