import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { CONFIG } from './config/config';
import incidentRoutes from './routes/incidentsRoute';
const PORT: number = Number(process.env.PORT) || 3000;
const mongoURL: string =
  'mongodb://' +
  CONFIG.MONGO_USER +
  ':' +
  CONFIG.MONGO_PASSWORD +
  '@' +
  CONFIG.MONGO_IP +
  ':' +
  CONFIG.MONGO_PORT +
  '/?authSource=admin';
const app = express();
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
app.use(json());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //Error handling middleware.
  res.status(500).json({
    message: err.message,
  });
});
app.use('/incidents', incidentRoutes);
app.listen(PORT, () => console.log("It's alive on http://localhost:" + PORT));
connectWithRetry();
