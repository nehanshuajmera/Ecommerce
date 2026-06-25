import { AppError } from './appError.js';

export class ValidationError extends AppError {
  constructor(errors) {
    super('Validation failed', 400);
    this.errors = errors; // array of { field, message }
  }
}
