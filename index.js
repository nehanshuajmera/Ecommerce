import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
config();

import { connectDB } from './config/db.js';
import { userRoutes } from './routes/userRoutes.js';
import { productRoutes } from './routes/productRoutes.js';
import { cartRoutes } from './routes/cartRoutes.js';
import { wishlistRoutes } from './routes/wishlistRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const REQUIRED_ENV_VARS = ['PORT', 'MONGO_DB', 'JWT_SECRET'];
for (const key of REQUIRED_ENV_VARS) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const app = express();
const PORT = process.env.PORT;
const { CORS_ORIGIN, CORS_METHODS, CORS_CREDENTIALS, CORS_HEADERS } =
  process.env;

const corsOptions = {
  origin: CORS_ORIGIN ? CORS_ORIGIN.split(',') : [],
  methods: CORS_METHODS ? CORS_METHODS.split(',') : ['GET', 'POST'],
  credentials: CORS_CREDENTIALS === 'true',
  allowedHeaders: CORS_HEADERS ? CORS_HEADERS.split(',') : ['Content-Type'],
  optionsSuccessStatus: 200,
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// routes

// health check
app.get('/', (req, res) => {
  res.send('Backend Working, Happy Coding!');
});

app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);

// error handler
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

start();
