import { Request, Response } from 'express';
import { Activity } from '../models/Activity';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await Activity.aggregate([
      {
        $group: {
          _id: '$user',
          totalCalories: { $sum: '$caloriesBurned' },
          totalDuration: { $sum: '$durationMinutes' },
          activityCount: { $sum: 1 },
        },
      },
      {
        $sort: { totalCalories: -1, totalDuration: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          user: '$_id',
          totalCalories: 1,
          totalDuration: 1,
          activityCount: 1,
          _id: 0,
        },
      },
    ]).exec();

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
};
