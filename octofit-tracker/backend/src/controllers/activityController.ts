import { Request, Response } from 'express';
import { Activity } from '../models/Activity';

export const listActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user', 'name email').lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user', 'name email').lean();
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activity', error });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { user, type, durationMinutes, caloriesBurned, recordedAt } = req.body;
    const activity = new Activity({ user, type, durationMinutes, caloriesBurned, recordedAt });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create activity', error });
  }
};
