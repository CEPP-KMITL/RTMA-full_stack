"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var incidentsController_1 = require("../controllers/incidentsController");
var authProtect = require('../middleware/authMiddleware');
var router = express_1.Router();
router.route('/patchIncident/:id').patch(authProtect, incidentsController_1.updateIncident);
router.route('/deleteIncident/:id').delete(authProtect, incidentsController_1.deleteIncident);
router.route('/postIncident').post(authProtect, incidentsController_1.createIncident);
router.get('/getAllIncidents', incidentsController_1.getAllIncidents);
router.get('/getIncident/:id', incidentsController_1.getIncident);
exports.default = router;