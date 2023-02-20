import { Router } from 'express';

import {
    createMachineModel,
    deleteMachineModel,
    getAllMachineModel,
    updateMachineModel,
    getMachineModelById,
} from '../controllers/machinemodel.controller';

const router = Router();

router.post('/', createMachineModel);

router.get('/', getAllMachineModel);

router.get('/:id', getMachineModelById);

router.put('/:id', updateMachineModel);

router.delete('/:id', deleteMachineModel);

export default router;
