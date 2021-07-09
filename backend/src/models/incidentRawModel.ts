import mongoose from 'mongoose';

const BodyAccidentSchema = new mongoose.Schema({
  id: {
    type: String,
    require: [true, 'Incident must have id'],
    unique: true
  }
},
{strict:false}
);

const incidentRawSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Incident must have title'],
  },
  search_keyword:{
    type: String,
    require: [true, 'Incident must have search_keyword'],
  },
  body: {
    type: BodyAccidentSchema,
    require: [true, 'Incident must have body'],
  },
  packaging_timestamp:{
    type: String,
    require: [true, 'Incident must have packaging_timestamp'],
  }
},
{strict:false}
);


const IncidentRaw = mongoose.model('IncidentRaw', incidentRawSchema);
export { IncidentRaw };
