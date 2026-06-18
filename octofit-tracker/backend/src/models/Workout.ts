import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  user: Types.ObjectId;
  name: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  scheduledAt: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    scheduledAt: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
