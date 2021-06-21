import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Incident must have title'],
  },
  body: {
    type: String,
    require: [true, 'Incident must have body'],
  },
});

const Incident = mongoose.model('Incident', incidentSchema);
export { Incident };
