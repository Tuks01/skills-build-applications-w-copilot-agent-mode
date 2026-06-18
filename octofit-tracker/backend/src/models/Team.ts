import { Schema, model, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  members: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

export const Team = model<ITeam>('Team', teamSchema);
