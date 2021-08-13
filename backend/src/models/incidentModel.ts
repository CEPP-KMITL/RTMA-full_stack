import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
    require: [true, 'information must have a type'],
  },
  formattedname: {
    type: String,
    require: [true, 'information must have a formattedname'],
  },
  content: {
    type: String,
    require: [true, 'information must have a content'],
  },
  link: {
    type: String,
    require: [true, 'information must have a link'],
  },
  date: {
    type: Date,
    require: [true, 'information must have a date'],
  },
  from: {
    type: String,
    require: [true, 'information must have a from'],
  },
  province: {
    type: String,
    require: [true, 'information must have aprovince'],
  },
  latitude: {
    type: Number,
    require: [true, 'information must have a latitude'],
  },
  longitude: {
    type: Number,
    require: [true, 'information must have a longitude'],
  },
});

const Incident = mongoose.model('Incident', incidentSchema);
export { Incident };
