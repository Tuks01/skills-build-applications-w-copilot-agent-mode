import { Request, Response } from 'express';

export const getRoot = (req: Request, res: Response) => {
  res.json({ message: 'OctoFit Tracker API Server' });
};

export const getHealth = (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};
