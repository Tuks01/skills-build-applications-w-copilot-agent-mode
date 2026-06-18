import { Router } from 'express';
import { createTeam, listTeams, getTeamById } from '../controllers/teamController';

const router = Router();

router.get('/', listTeams);
router.get('/:id', getTeamById);
router.post('/', createTeam);

export default router;
