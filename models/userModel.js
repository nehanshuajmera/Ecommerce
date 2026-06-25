import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { ValidationError } from '../errors/error.js';

const Schema = mongoose.Schema;

const USERNAME_REGEX = /^[a-z0-9_.-]{8,}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        const { _id, password, __v, ...rest } = ret;
        return {
          id: _id,
          ...rest,
        };
      },
    },
  },
);

// User SignUp and Login methods
userSchema.statics.signup = async function (username, email, password) {
  const errors = [];

  if (!username)
    errors.push({ field: 'username', message: 'Username is required' });
  if (!email) errors.push({ field: 'email', message: 'Email is required' });
  if (!password)
    errors.push({ field: 'password', message: 'Password is required' });

  const normalizedUsername = username ? username.toLowerCase().trim() : '';
  const normalizedEmail = email ? email.toLowerCase().trim() : '';

  if (email && !validator.isEmail(normalizedEmail)) {
    errors.push({ field: 'email', message: 'Please provide a valid email' });
  }
  if (username && !validator.matches(normalizedUsername, USERNAME_REGEX)) {
    errors.push({
      field: 'username',
      message:
        'Username must be at least 8 characters long and contain only lowercase letters, numbers, underscores, hyphens, and periods',
    });
  }
  if (
    password &&
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.push({
      field: 'password',
      message:
        'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
    });
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  const existingUser = await this.findOne({
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
  }).lean();

  if (existingUser) {
    if (existingUser.username === normalizedUsername) {
      errors.push({ field: 'username', message: 'Username already exists' });
    }
    if (existingUser.email === normalizedEmail) {
      errors.push({ field: 'email', message: 'Email already exists' });
    }
    throw new ValidationError(errors);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = await this.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: passwordHash,
    });
    return user;
  } catch (err) {
    
    // handle race condition
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      throw new ValidationError([
        {
          field,
          message: `${field === 'username' ? 'Username' : 'Email'} already exists`,
        },
      ]);
    }
    throw err;
  }
};

userSchema.statics.signin = async function (usernameOrEmail, password) {
  const errors = [];
  if (!usernameOrEmail) {
    errors.push({
      field: 'usernameOrEmail',
      message: 'Username or email is required',
    });
  }
  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  const normalized = usernameOrEmail.toLowerCase().trim();

  const user = await this.findOne({
    $or: [{ username: normalized }, { email: normalized }],
  }).select('+password');

  if (!user) {
    throw new ValidationError([
      { field: 'form', message: 'Invalid credentials' },
    ]);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ValidationError([
      { field: 'form', message: 'Invalid credentials' },
    ]);
  }

  return user;
};

export const User = mongoose.model('User', userSchema);
