// After /users the remaining part of url is handled here

import express from 'express';
import { getProfile, signin, signup } from '../../controllers/userController.js';
import { validate } from '../../validators/zodValidator.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', validate(zodSignupSchema), signup);

router.post('/signin', validate(zodSigninSchema), signin);

router.get('/profile', isAuthenticated, getProfile);

export default router;