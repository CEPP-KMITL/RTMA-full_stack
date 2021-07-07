import mongoose from 'mongoose';

const incidentRawSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Incident must have title'],
    unique: true
  },
  body: {
    type: String,
    require: [true, 'Incident must have body'],
  },
});

const IncidentRaw = mongoose.model('Incident', incidentRawSchema);
export { IncidentRaw };
