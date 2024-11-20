import express from 'express';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createComment, getCommentById } from '../../controllers/commentController.js';

const router = express.Router();

router.get('/:id', isAuthenticated, getCommentById);

router.post('/', isAuthenticated, createComment);

export default router;