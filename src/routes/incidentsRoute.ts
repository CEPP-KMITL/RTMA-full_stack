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
router.get('/getIncident/:id', getIncident);
router.patch('/patchIncident/:id', updateIncident);
router.post('/postIncident', createIncident);
router.delete('/deleteIncident/:id', deleteIncident);

export default router;
