import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Incident, IncidentObject } from '../models/incidentModel';

export const createIncident: RequestHandler = async (req, res, next) => {
  try {
    const title: string = (req.body as { title: string; body: string }).title;
    const description: string = (req.body as { title: string; body: string })
      .body;
    const newIncident: IncidentObject = new IncidentObject(
      uuidv4(),
      title,
      description
    );
    await Incident.create(newIncident);
    res.status(201).json({
      message: 'Create incident successfully!!!',
      createIncident: newIncident,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to reate incident.',
    });
  }
};

export const getAllIncidents: RequestHandler = async (req, res, next) => {
  try {
    const allIncidents = await Incident.find();
    res.status(201).json({
      message: 'Get all current incidents successfully.',
      results: Incident.length,
      getIncidents: allIncidents,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to get all current incidents.',
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
      message: 'Fail to get the incidents.',
    });
  }
};

export const updateIncident: RequestHandler = async (req, res, next) => {
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
      message: 'Fail to update the incident.',
    });
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
      message: 'Fail to delete the incident.',
    });
  }
};
