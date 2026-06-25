import { User } from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import { COOKIE_NAME, cookieOptions } from '../utils/cookieOptions.js';

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.signup(username, email, password);

    const token = generateToken(user.id);
    res.cookie(COOKIE_NAME, token, cookieOptions);

    res.status(201).json({ user: { username, email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await User.signin(usernameOrEmail, password);

    const token = generateToken(user.id);
    res.cookie(COOKIE_NAME, token, cookieOptions);

    const { username, email, role } = user;
    res.status(200).json({ user: { username, email, role } });
  } catch (err) {
    next(err);
  }
};

export const signout = (req, res) => {
  res.clearCookie(COOKIE_NAME, cookieOptions);
  res.status(200).json({ message: 'Signed out successfully' });
};

export const currentUser = (req, res) => {
  const { username, email, role } = req.user;
  res.status(200).json({ user: { username, email, role } });
};
