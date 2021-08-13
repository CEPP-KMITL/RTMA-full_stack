import mongoose from 'mongoose';

const incidentRawSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  search_keyword: {
    type: String,
  },
  id:{
    type: String,
    unique: true
  },
  date:{
    type: String,
  },
  body: {
    type: String,
  },
  link: {
    type: String,
  },
  tag: {
    type: String,
  },
  type: {
    type: String,
  },
  create_at: {
    type: Date,
  },
},
{strict:false}
);


const IncidentRaw = mongoose.model('IncidentRaw', incidentRawSchema);
export { IncidentRaw };
