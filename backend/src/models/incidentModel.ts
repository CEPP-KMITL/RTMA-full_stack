import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
    require: [true, 'User must have a username'],
  },
  formattedname: {
    type: String,
    require: [true, 'User must have a username'],
  },
  content: {
    type: String,
    require: [true, 'User must have a username'],
  },
  link: {
    type: String,
    require: [true, 'User must have a username'],
  },
  date: {
    type: Date,
    require: [true, 'User must have a username'],
  },
  from: {
    type: String,
    require: [true, 'User must have a username'],
  },
  province: {
    type: String,
    require: [true, 'User must have a username'],
  },
  latitude: {
    type: Number,
    require: [true, 'User must have a username'],
  },
  longitude: {
    type: Number,
    require: [true, 'User must have a username'],
  },
});

const Incident = mongoose.model('Incident', incidentSchema);
export { Incident };
