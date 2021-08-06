import { Router } from 'express';
import {
  createIncident,
  getAllIncidents,
  getAll,
  updateIncident,
  deleteIncident,
  getonedayincident,
  getIncident,
} from '../controllers/incidentsRawController';
const router = Router();

router.route('/patchIncident/:id').patch(updateIncident);
router.route('/deleteIncident/:id').delete(deleteIncident);
router.route('/postIncident').post(createIncident);
router.get('/getAllIncidents', getAllIncidents);
router.get('/getAll', getAll);
router.get('/getOneDay', getonedayincident);
router.get('/getIncident/:id', getIncident);

export default router;
