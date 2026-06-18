import { Router } from 'express';
import { listWorkouts, getWorkoutById, createWorkout } from '../controllers/workoutController.ts';

const router = Router();

router.get('/', listWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', createWorkout);

export default router;
