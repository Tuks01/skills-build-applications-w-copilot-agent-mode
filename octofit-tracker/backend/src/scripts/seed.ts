import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.ts';
import { Team } from '../models/Team.ts';
import { Activity } from '../models/Activity.ts';
import { Workout } from '../models/Workout.ts';
import { Leaderboard } from '../models/Leaderboard.ts';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seedData = async () => {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to MongoDB at ${MONGODB_URI}`);

  try {
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Amina Carter', email: 'amina@example.com', password: 'securepass' },
      { name: 'Jonah Lee', email: 'jonah@example.com', password: 'securepass' },
      { name: 'Priya Singh', email: 'priya@example.com', password: 'securepass' },
    ]);

    const teams = await Team.create([
      {
        name: 'OctoFit Champions',
        description: 'A top-performing group of activity enthusiasts.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Wellness Warriors',
        description: 'Community team focused on consistent progress.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        caloriesBurned: 360,
        recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        user: users[0]._id,
        type: 'Cycling',
        durationMinutes: 50,
        caloriesBurned: 480,
        recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      },
      {
        user: users[1]._id,
        type: 'Yoga',
        durationMinutes: 45,
        caloriesBurned: 180,
        recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      },
      {
        user: users[1]._id,
        type: 'Strength Training',
        durationMinutes: 60,
        caloriesBurned: 520,
        recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
      },
      {
        user: users[2]._id,
        type: 'Swimming',
        durationMinutes: 40,
        caloriesBurned: 420,
        recordedAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
      },
    ]);

    const workouts = await Workout.create([
      {
        user: users[0]._id,
        name: 'Morning Interval Run',
        type: 'Cardio',
        durationMinutes: 30,
        caloriesBurned: 320,
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60),
        completed: false,
      },
      {
        user: users[1]._id,
        name: 'Strength and Core',
        type: 'Strength',
        durationMinutes: 55,
        caloriesBurned: 520,
        scheduledAt: new Date(Date.now() + 1000 * 60 * 120),
        completed: false,
      },
      {
        user: users[2]._id,
        name: 'Evening Swim Session',
        type: 'Swimming',
        durationMinutes: 45,
        caloriesBurned: 410,
        scheduledAt: new Date(Date.now() + 1000 * 60 * 180),
        completed: false,
      },
    ]);

    const leaderboard = await Leaderboard.create([
      {
        user: users[0]._id,
        rank: 1,
        totalCalories: 840,
        totalDuration: 85,
        activityCount: 2,
        generatedAt: new Date(),
      },
      {
        user: users[1]._id,
        rank: 2,
        totalCalories: 700,
        totalDuration: 105,
        activityCount: 2,
        generatedAt: new Date(),
      },
      {
        user: users[2]._id,
        rank: 3,
        totalCalories: 420,
        totalDuration: 40,
        activityCount: 1,
        generatedAt: new Date(),
      },
    ]);

    console.log('Database initialization complete.');
    console.log({ users: users.length, teams: teams.length, activities: activities.length, workouts: workouts.length, leaderboard: leaderboard.length });
  } catch (error) {
    console.error('Initialization failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

seedData().catch((error) => {
  console.error('Unhandled error during seed:', error);
  process.exit(1);
});
