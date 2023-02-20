import { Router } from 'express';

import {
    getUserByJWT,
    deleteUser,
    getAllUser,
    updateUser,
    getUserById,
} from '../controllers/user.controller';

const router = Router();

router.get('/auth', getUserByJWT);

router.get('/', getAllUser);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
