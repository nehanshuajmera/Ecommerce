import { AppError } from '../errors/error.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    const body = err.errors
      ? { errors: err.errors } 
      : { message: err.message }; 
    return res.status(err.statusCode).json(body);
  }
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
};
