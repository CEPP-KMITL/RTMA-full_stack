import { Router } from 'express';
import {
  createIncident,
  getAllIncidents,
  updateIncident,
  deleteIncident,
  getIncident,
} from '../controllers/incidentsController';
const router = Router();

router.get('/getAllIncidents', getAllIncidents);
router.get('/getIncident', getIncident);
router.patch('/patchIncident', updateIncident);
router.post('/postIncident', createIncident);
router.delete('/deleteIncident', deleteIncident);

export default router;
