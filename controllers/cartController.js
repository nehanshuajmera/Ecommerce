import { Cart } from '../models/cartModel.js';
import { NotFoundError, ValidationError } from '../errors/error.js';

const formatCart = (cart) => {
  const items = cart.items.map((item) => {
    const subtotal = item.product.price * item.quantity;
    return {
      productId: item.product.id,
      title: item.product.title,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
      subtotal,
    };
  });

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    cartId: cart.id,
    items,
    total,
  };
};

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      'items.product',
    );
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    res.status(200).json(formatCart(cart));
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      throw new ValidationError([
        { field: 'productId', message: 'productId is required' },
      ]);
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json(formatCart(cart));
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json(formatCart(cart));
  } catch (err) {
    next(err);
  }
};

export const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      throw new ValidationError([
        { field: 'quantity', message: 'quantity must be at least 1' },
      ]);
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (!item) {
      throw new NotFoundError('Item not in cart');
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json(formatCart(cart));
  } catch (err) {
    next(err);
  }
};