// base class for all custom, "expected" errors
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true; // distinguishes "expected" errors from raw bugs
    Error.captureStackTrace(this, this.constructor);
  }
}
