import { Request, Response } from 'express';
import { User } from '../models/User';

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password').lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(409).json({ message: 'User with email already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();
    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
};
