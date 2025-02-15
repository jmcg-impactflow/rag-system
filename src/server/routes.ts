import { Router } from 'express';
import uploadDocument from './controllers/documentController';
import handleQuery from './controllers/queryController';

const router = Router();

router.post('/documents', uploadDocument);
router.post('/query', handleQuery);

export default router;