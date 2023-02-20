import { Router } from 'express';

import {
    createConnection,
    deleteConnection,
    getAllConnection,
    updateConnection,
    getConnectionById,
} from '../controllers/connection.controller';

const router = Router();

router.post('/', createConnection);

router.get('/', getAllConnection);

router.get('/:id', getConnectionById);

router.put('/:id', updateConnection);

router.delete('/:id', deleteConnection);

export default router;
