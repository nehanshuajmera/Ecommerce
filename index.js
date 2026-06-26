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

const REQUIRED_ENV_VARS = ['MONGO_DB', 'JWT_SECRET'];
for (const key of REQUIRED_ENV_VARS) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const app = express();
const PORT = process.env.PORT || 8080;
const { CORS_ORIGIN, CORS_METHODS, CORS_CREDENTIALS, CORS_HEADERS } =
  process.env;

const corsOptions = {
  origin: CORS_ORIGIN ? CORS_ORIGIN.split(',').map((o) => o.trim()) : [],
  methods: CORS_METHODS
    ? CORS_METHODS.split(',')
    : ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: CORS_CREDENTIALS === 'true',
  allowedHeaders: CORS_HEADERS ? CORS_HEADERS.split(',') : ['Content-Type'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Backend Working, Happy Coding!');
});

app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);

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
