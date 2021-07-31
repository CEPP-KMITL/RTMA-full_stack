import { RequestHandler } from 'express';
import { Incident } from '../models/incidentModel';

function ObjectLength(object: Array<object>) {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
}

export const createIncident: RequestHandler = async (req, res, next) => {
  try {
    const newIncident = await Incident.create(req.body);
    res.status(201).json({
      message: 'Create incident successfully.',
      createdIncident: newIncident,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to create incident' + ' : ' + e,
    });
  }
};

export const getAllIncidents: RequestHandler = async (req, res, next) => {
  try {
    const allIncidents = await Incident.find();
    res.status(201).json({
      message: 'Get all current incidents successfully.',
      results: ObjectLength(allIncidents),
      getIncidents: allIncidents,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to get all current incidents ' + ' : ' + e,
    });
  }
};

export const getonedayincident: RequestHandler = async (req, res, next) => {
  var temp = new Date() 
  temp.setDate(temp.getDate()-1)

  try {
    const allIncidents = await Incident.find().where('create_at').gt(temp.toISOString());
    res.status(201).json({
      message: 'Get all current incidents successfully.',
      results: ObjectLength(allIncidents),
      getIncidents: allIncidents,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to get all current incidents ' + ' : ' + e,
    });
  }
};

export const getIncident: RequestHandler = async (req, res, next) => {
  try {
    const targetIncident = await Incident.findById(req.params.id);
    res.status(201).json({
      message: 'Get the incidents successfully.',
      getIncident: targetIncident,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to get the incidents' + ' : ' + e,
    });
  }
};

export const updateIncident: RequestHandler = async (req, res, next) => {
  if (req.body.title == undefined){
    res.status(400).json({
      message: 'Fail to create incident'
    });
  }
  else if (req.body.information == undefined){
    res.status(400).json({
      message: 'Fail to create incident'
    });
  }
  else if (req.body.type == undefined){
    res.status(400).json({
      message: 'Fail to create incident'
    });
  }
  else if (req.body.source == undefined){
    res.status(400).json({
      message: 'Fail to create incident'
    });
  }
  else if (req.body.location == undefined){
    res.status(400).json({
      message: 'Fail to create incident'
    });
  }
  else{
    try {
      const targetIncident = await Incident.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(201).json({
        message: 'Update the incident successfully.',
        updateTarget: targetIncident,
      });
    } catch (e) {
      res.status(400).json({
        message: 'Fail to update the incident' + ' : ' + e,
      });
    }
  }
};

export const deleteIncident: RequestHandler = async (req, res, next) => {
  try {
    const targetIncident = await Incident.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: 'Delete the incident successfully.',
      deleteTarget: targetIncident,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to delete the incident' + ' : ' + e,
    });
  }
};
