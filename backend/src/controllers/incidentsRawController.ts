import { RequestHandler } from 'express';
import { IncidentRaw } from '../models/incidentRawModel';

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
  if (req.body.title == undefined){
    res.status(400).json({
      message: 'Fail to create title'
    });
  }
  else if (req.body.body == undefined){
    res.status(400).json({
      message: 'Fail to create body'
    });
  }
  else if (req.body.packaging_timestamp == undefined){
    res.status(400).json({
      message: 'Fail to create packaging_timestamp'
    });
  }
  else if (req.body.search_keyword == undefined){
    res.status(400).json({
      message: 'Fail to create search_keyword'
    });
  }
  else{
    try {
      const newIncident = await IncidentRaw.create({...req.body,type:"อิอิ"});
      res.status(201).json({
        message: 'Create incident successfully.',
        createdIncident: newIncident,
      });
    } catch (e) {
      res.status(400).json({
        message: 'Fail to create incident' + ' : ' + e,
      });
    }
  }
};

export const getAllIncidents: RequestHandler = async (req, res, next) => {
  try {
    const allIncidents = await IncidentRaw.find();
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
    const targetIncident = await IncidentRaw.findById(req.params.id);
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
  else if (req.body.body == undefined){
    res.status(400).json({
      message: 'Fail to create incident'
    });
  }
  else if (req.body.packaging_timestamp == undefined){
    res.status(400).json({
      message: 'Fail to create incident'
    });
  }
  else{
    try {
      const targetIncident = await IncidentRaw.findByIdAndUpdate(
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
    const targetIncident = await IncidentRaw.findByIdAndDelete(req.params.id);
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
