import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../controllers/wishlistController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getWishlist);
router.post('/add', addToWishlist);
router.delete('/item/:productId', removeFromWishlist);

export const wishlistRoutes = router;
