import { Router } from 'express';
import { createActivity, listActivities, getActivityById } from '../controllers/activityController';

const router = Router();

router.get('/', listActivities);
router.get('/:id', getActivityById);
router.post('/', createActivity);

export default router;
