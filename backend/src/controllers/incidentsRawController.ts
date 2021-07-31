import { RequestHandler } from 'express';
import { date, number } from 'joi';
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
  var from
  var search_keyword
  var id
  var date
  var body
  var link
  var type 
  var create_at = new Date()
  if(req.body.from == 'TWITTER'){
    from = req.body.from
    search_keyword = req.body.search_keyword
    id = req.body.body.info.id
    date = req.body.body.info.date+req.body.body.info.time
    body = req.body.body.info.tweet
    link = req.body.body.info.link
    create_at = new Date()
    if(req.body.search_keyword.includes('ชน')){
      type = "รถชน"
    }
    else if(req.body.search_keyword.includes('ไหม้')){
      type = "ไฟไหม้"
    }
    else{
      type = "อุบัติเหตุอื่นๆ"
    }
  }
  else if (req.body.from == 'THAIRAT'){
    from = req.body.from
    search_keyword = req.body.search_keyword
    id = req.body.body.metaScrape.title
    date = req.body.body.deepScrape.date
    body = req.body.body.deepScrape.body
    link = req.body.body.metaScrape.url
    create_at = new Date()
    if(req.body.search_keyword.includes('ชน')){
      type = "รถชน"
    }
    else if(req.body.search_keyword.includes('ไหม้')){
      type = "ไฟไหม้"
    }
    else{
      type = "อุบัติเหตุอื่นๆ"
    }
  }
  try {
    const newIncident = await IncidentRaw.create({
      from,
      search_keyword,
      id,
      date,
      body,
      link,
      type,
      check:false,
      create_at,
    });
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
    const allIncidents = await IncidentRaw.find({check:false})
    const incidentIdList = allIncidents.map((e : any)=>e._id)
    console.log(incidentIdList)
    await Promise.all(incidentIdList.map((element : any )=> 
      IncidentRaw.findByIdAndUpdate(
        String(element),
        {check:true}
      )
    ))
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
