import { Wishlist } from '../models/wishlistModel.js';
import { NotFoundError, ValidationError } from '../errors/error.js';

const formatWishlist = (wishlist) => {
  const products = wishlist.products.map((product) => ({
    productId: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    rating: product.rating,
  }));

  return {
    wishlistId: wishlist.id,
    products,
    count: products.length,
  };
};

export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      'products',
    );
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, products: [] });
    }
    res.status(200).json(formatWishlist(wishlist));
  } catch (err) {
    next(err);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      throw new ValidationError([
        { field: 'productId', message: 'productId is required' },
      ]);
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, products: [] });
    }

    const alreadyExists = wishlist.products.some(
      (id) => id.toString() === productId,
    );

    if (!alreadyExists) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    await wishlist.populate('products');
    res.status(200).json(formatWishlist(wishlist));
  } catch (err) {
    next(err);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      throw new NotFoundError('Wishlist not found');
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId,
    );

    await wishlist.save();
    await wishlist.populate('products');

    res.status(200).json(formatWishlist(wishlist));
  } catch (err) {
    next(err);
  }
};
