import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Incident } from '../models/incident';

let incidentsCache: Incident[] = [];

export const createIncident: RequestHandler = (req, res, next) => {
  const title: string = (req.body as { title: string }).title;
  const newIncident: Incident = new Incident(uuidv4(), title);
  incidentsCache.push(newIncident);

  res.status(201).json({
    message: 'Create incident successfully.',
    createIncident: newIncident,
  });
};

export const getAllIncidents: RequestHandler = (req, res, next) => {
  const currentIncidentsCache: Incident[] = incidentsCache;
  res.status(201).json({
    message: 'Get all current incidents successfully.',
    getIncident: currentIncidentsCache,
  });
};
