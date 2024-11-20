import express from 'express';
import { isAuthenticated } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/', isAuthenticated, createComment);

export default router;