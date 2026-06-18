import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Types.ObjectId;
  rank: number;
  totalCalories: number;
  totalDuration: number;
  activityCount: number;
  generatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    totalCalories: { type: Number, required: true, min: 0 },
    totalDuration: { type: Number, required: true, min: 0 },
    activityCount: { type: Number, required: true, min: 0 },
    generatedAt: { type: Date, required: true, default: () => new Date() },
  },
  {
    timestamps: true,
  }
);

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);
