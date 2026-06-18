import { Request, Response } from 'express';
import { Workout } from '../models/Workout';

export const listWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('user', 'name email').lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
};

export const getWorkoutById = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('user', 'name email').lean();
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workout', error });
  }
};

export const createWorkout = async (req: Request, res: Response) => {
  try {
    const { user, name, type, durationMinutes, caloriesBurned, scheduledAt, completed } = req.body;
    const workout = new Workout({ user, name, type, durationMinutes, caloriesBurned, scheduledAt, completed });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create workout', error });
  }
};
