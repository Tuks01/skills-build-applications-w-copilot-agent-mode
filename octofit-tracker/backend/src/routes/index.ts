import { Router } from 'express';
import healthRouter from './health.ts';
import usersRouter from './users.ts';
import activitiesRouter from './activities.ts';
import teamsRouter from './teams.ts';
import leaderboardRouter from './leaderboard.ts';
import workoutsRouter from './workouts.ts';

const router = Router();

router.use('/health', healthRouter);
router.use('/users', usersRouter);
router.use('/activities', activitiesRouter);
router.use('/teams', teamsRouter);
router.use('/leaderboard', leaderboardRouter);
router.use('/workouts', workoutsRouter);

export default router;
