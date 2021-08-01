import { Router } from 'express';
import {
  createIncident,
  getAllIncidents,
  updateIncident,
  deleteIncident,
  getonedayincident,
  get8hoursincident,
  getIncident,
} from '../controllers/incidentsController';
const router = Router();

router.route('/patchIncident/:id').patch(updateIncident);
router.route('/deleteIncident/:id').delete(deleteIncident);
router.route('/postIncident').post(createIncident);
router.get('/getAllIncidents', getAllIncidents);
router.get('/getOneDay', getonedayincident);
router.get('/get8hours', get8hoursincident);
router.get('/getIncident/:id', getIncident);

export default router;
