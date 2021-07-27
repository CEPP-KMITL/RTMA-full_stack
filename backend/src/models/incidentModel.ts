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
  create_at: {
    type: Date,
  },
});

const Incident = mongoose.model('Incident', incidentSchema);
export { Incident };
