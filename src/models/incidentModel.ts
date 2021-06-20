import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  uid: {
    type: String,
    require: [true, 'Incident must have uid'],
  },
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

export class IncidentObject {
  constructor(
    private readonly id: string,
    private title: string,
    private description: string
  ) {}
}
