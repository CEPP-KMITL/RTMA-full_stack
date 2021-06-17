import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import incidentRoutes from './routes/incidents';

const PORT: number = Number(process.env.PORT) || 3000;
const app = express();
app.use(json());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //Error handling middleware.
  res.status(500).json({
    message: err.message,
  });
});
app.use('/incidents', incidentRoutes);
app.listen(PORT, () => console.log("It's alive on http://localhost:" + PORT));
