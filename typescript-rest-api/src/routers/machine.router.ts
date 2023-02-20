import { Router } from 'express';

import {
    createMachine,
    deleteMachine,
    getAllMachine,
    updateMachine,
    getMachineById,
} from '../controllers/machine.controller';

const router = Router();

router.post('/', createMachine);

router.get('/', getAllMachine);

router.get('/:id', getMachineById);

router.put('/:id', updateMachine);

router.delete('/:id', deleteMachine);

export default router;
