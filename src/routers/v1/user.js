// After /users the remaining part of url is handled here

import express from 'express';
import { getProfile, signin, signup } from '../../controllers/userController.js';
import { validate } from '../../validators/zodValidator.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Signup a new user
 *      description: Signup a new user
 */
router.post('/signup', validate(zodSignupSchema), signup);

/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 */
router.post('/signin', validate(zodSigninSchema), signin);

router.get('/profile', isAuthenticated, getProfile);

export default router;