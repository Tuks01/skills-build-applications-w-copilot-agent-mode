import { Router } from 'express';
import { createUser, listUsers, getUserById } from '../controllers/userController';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

export default router;
