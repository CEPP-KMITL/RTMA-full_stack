"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIncidents = exports.createIncident = void 0;
var uuid_1 = require("uuid");
var incident_1 = require("../models/incident");
var incidentsCache = [];
var createIncident = function (req, res, next) {
    var title = req.body.title;
    var newIncident = new incident_1.Incident(uuid_1.v4(), title);
    incidentsCache.push(newIncident);
    res.status(201).json({
        message: 'Create incident successfully.',
        createIncident: newIncident,
    });
};
exports.createIncident = createIncident;
var getAllIncidents = function (req, res, next) {
    var currentIncidentsCache = incidentsCache;
    res.status(201).json({
        message: 'Get all current incidents successfully.',
        getIncident: currentIncidentsCache,
    });
};
exports.getAllIncidents = getAllIncidents;
