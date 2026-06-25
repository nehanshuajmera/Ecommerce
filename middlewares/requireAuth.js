import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { UnauthorizedError } from '../errors/error.js';

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new UnauthorizedError();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedError();
    }

    req.user = user;
    next();
  } catch (err) {
    next(err instanceof UnauthorizedError ? err : new UnauthorizedError());
  }
};
