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
const authProtect = require('../middleware/authMiddleware');
const router = Router();

router.route('/patchIncident/:id').patch(authProtect, updateIncident);
router.route('/deleteIncident/:id').delete(authProtect, deleteIncident);
router.route('/postIncident').post(authProtect, createIncident);
router.get('/getAllIncidents', getAllIncidents);
router.get('/getOneDay', getonedayincident);
router.get('/getOneDay', get8hoursincident);
router.get('/getIncident/:id', getIncident);

export default router;
