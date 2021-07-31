import { Router } from 'express';
import {
  createIncident,
  getAllIncidents,
  updateIncident,
  deleteIncident,
  getonedayincident,
  getIncident,
} from '../controllers/incidentsRawController';
const authProtect = require('../middleware/authMiddleware');
const router = Router();

router.route('/patchIncident/:id').patch(authProtect, updateIncident);
router.route('/deleteIncident/:id').delete(authProtect, deleteIncident);
router.route('/postIncident').post(authProtect, createIncident);
router.get('/getAllIncidents', getAllIncidents);
router.get('/getOneDay', getonedayincident);
router.get('/getIncident/:id', getIncident);

export default router;
