import express from 'express';
const router = express.Router();

import {
  signup,
  signin,
  signout,
  currentUser,
} from '../controllers/userController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/currentuser', requireAuth, currentUser);

export const userRoutes = router;