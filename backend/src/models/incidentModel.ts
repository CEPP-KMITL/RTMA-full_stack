import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Incident must have title'],
    unique: true
  },
  information: {
    type: String,
    require: [true, 'Incident must have information']
  },
  type: {
    type: String,
    require: [true, 'Incident must have type']
  },
  source: {
    type: String,
    require: [true, 'Incident must have source']
  },
  location: {
    type: String,
    require: [true, 'Incident must have location']
  },
  date: {
    type: Date,
    default : new Date()
  }
});

const Incident = mongoose.model('Incident', incidentSchema);
export { Incident };
