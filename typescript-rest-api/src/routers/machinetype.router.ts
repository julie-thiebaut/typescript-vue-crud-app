import { Router } from 'express';

import {
    createMachineType,
    deleteMachineType,
    getAllMachineType,
    updateMachineType,
    getMachineTypeById,
} from '../controllers/machinetype.controller';

const router = Router();

router.post('/', createMachineType);

router.get('/', getAllMachineType);

router.get('/:id', getMachineTypeById);

router.put('/:id', updateMachineType);

router.delete('/:id', deleteMachineType);

export default router;
