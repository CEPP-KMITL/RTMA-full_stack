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
  var date = new Date()
  var temp = new Date() 
  var check = true
  temp.setHours(temp.getHours()-1)
  const allIncidents = await Incident.find().where('date').gt(temp.toISOString());
  for (var i in allIncidents) {
    var R = 6371; // Radius of the earth in km
    var dLat = (allIncidents[i].latitude-req.body.latitude)* (Math.PI/180);  // deg2rad below
    var dLon = (allIncidents[i].longitude-req.body.longitude)* (Math.PI/180); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(req.body.latitude* (Math.PI/180)) * Math.cos(allIncidents[i].latitude* (Math.PI/180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    if (d<0.4){
      check = false
    }
  }
  if (check == true){
    try {
      const newIncident = await Incident.create({...req.body,date});
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
  else{
    res.status(400).json({
      message: 'Fail to create incident' + ' :  location duplicate information' 
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


export const getfiveprovince: RequestHandler = async (req, res, next) => {
  try {
    const allIncidents = await Incident.find().select('province');
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

export const get8hoursincident: RequestHandler = async (req, res, next) => {
  var temp = new Date() 
  temp.setHours(temp.getHours()-8)

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
