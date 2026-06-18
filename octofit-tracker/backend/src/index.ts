import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/index.ts';
import connectDatabase from './config/database.ts';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const baseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

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
  res.json({ message: 'OctoFit Tracker API Server', baseUrl });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});
