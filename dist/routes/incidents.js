"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var incidents_1 = require("../controllers/incidents");
var router = express_1.Router();
router.get('/getAllIncidents', incidents_1.getAllIncidents);
router.patch('/patchIncident');
router.post('/postIncident', incidents_1.createIncident);
router.delete('/deleteIncident');
exports.default = router;