import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  formattedname: {
    type: String,
  },
  content: {
    type: String,
  },
  link: {
    type: String,
  },
  date: {
    type: String,
  },
  from: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

const Incident = mongoose.model('Incident', incidentSchema);
export { Incident };
