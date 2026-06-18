import type { Request, Response } from 'express';
import { Team } from '../models/Team.ts';

export const listTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members', 'name email').lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', 'name email').lean();
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch team', error });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description, members } = req.body;
    const team = new Team({ name, description, members });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create team', error });
  }
};
