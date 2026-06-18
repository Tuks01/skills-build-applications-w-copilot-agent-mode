import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import connectDatabase from './config/database.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

// MongoDB Connection
connectDatabase().catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Basic root route
app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API Server' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
