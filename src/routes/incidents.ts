import { Router } from 'express';
import { createIncident, getAllIncidents } from '../controllers/incidents';
const router = Router();

router.get('/getAllIncidents', getAllIncidents);
router.patch('/patchIncident');
router.post('/postIncident', createIncident);
router.delete('/deleteIncident');

export default router;
