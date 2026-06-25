import { Product } from '../models/productModel.js';
import { NotFoundError, ValidationError } from '../errors/error.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { title, image, price, rating } = req.body;

    const errors = [];
    if (!title) errors.push({ field: 'title', message: 'title is required' });
    if (!image) errors.push({ field: 'image', message: 'image is required' });
    if (price === undefined || price === null) {
      errors.push({ field: 'price', message: 'price is required' });
    } else if (price < 0) {
      errors.push({ field: 'price', message: 'price cannot be negative' });
    }

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    const product = await Product.create({ title, image, price, rating });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { title, image, price, rating } = req.body;

    const errors = [];
    if (price !== undefined && price < 0) {
      errors.push({ field: 'price', message: 'price cannot be negative' });
    }
    if (rating !== undefined && (rating < 0 || rating > 5)) {
      errors.push({
        field: 'rating',
        message: 'rating must be between 0 and 5',
      });
    }

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (image !== undefined) updates.image = image;
    if (price !== undefined) updates.price = price;
    if (rating !== undefined) updates.rating = rating;

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};