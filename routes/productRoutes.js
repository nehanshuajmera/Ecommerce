import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} from '../controllers/productController.js';

import { requireAuth } from '../middlewares/requireAuth.js';
import {requireRole} from '../middlewares/requireRole.js';

const isAdmin = requireRole('admin');

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin-only routes
router.post('/', requireAuth, isAdmin, createProduct);
router.patch('/:id', requireAuth, isAdmin, updateProduct);

export const productRoutes = router;
