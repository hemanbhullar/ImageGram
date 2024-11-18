// Here all the post related routes are present
// we look at the remaining url part after /posts
import express from 'express';
// s3uploader
import { upload } from '../../config/multerConfig.js'
import { createPost, deletePostByid, getAllPost, updatePostByid } from '../../controllers/postController.js';
import { validate } from '../../validators/zodValidator.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { cloudinaryConfig } from '../../config/cloudinaryConfig.js';
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router(); // Router object to modularize the routes

cloudinaryConfig();

// router.post('/', s3uploader.single('image'), validate(zodPostSchema), createPost);


/**
 * @swagger
 * /posts:
 *  post:
 *     summary: Create a new post
 *     description: Create a new post
 * 
 */
router.post('/', isAuthenticated, upload.single('image'), validate(zodPostSchema), createPost);

router.get('/', getAllPost);

router.put('/:id', isAuthenticated, isAdmin, updatePostByid);

router.delete('/:id', isAuthenticated, deletePostByid);

export default router;