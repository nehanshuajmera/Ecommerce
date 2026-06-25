import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from '../controllers/cartController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

router.use(requireAuth); // every cart route requires login

router.get('/', getCart);
router.post('/add', addToCart);
router.patch('/item/:productId', updateCartItemQuantity);
router.delete('/item/:productId', removeFromCart);

export const cartRoutes = router;
