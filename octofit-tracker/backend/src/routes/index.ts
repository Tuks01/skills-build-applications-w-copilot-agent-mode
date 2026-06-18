import { Router } from 'express';
import healthRouter from './health';
import usersRouter from './users';
import activitiesRouter from './activities';
import teamsRouter from './teams';
import leaderboardRouter from './leaderboard';

const router = Router();

router.use('/health', healthRouter);
router.use('/users', usersRouter);
router.use('/activities', activitiesRouter);
router.use('/teams', teamsRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
