import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { CONFIG } from './config/config';
import incidentRoutes from './routes/incidentsRoute';
import incidentRawRoutes from './routes/incidentsRawRoute';
import userRoutes from './routes/userRoute';

const redis = require('redis');
const session = require('express-session');
const cors = require('cors');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
  host: CONFIG.REDIS_URL,
  port: CONFIG.REDIS_PORT,
});

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
app.enable('trust proxy');
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: CONFIG.SESSION_SECRET,
    cookie: {
      cookieName: 'sessioncookie',
      resave: false,
      saveUninitialized: false,
      secure: false,
      httpOnly: true,
      maxAge: 3000000,
    },
  }),
);
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
app.use('/api/v1/incidents', incidentRoutes);
app.use('/api/v1/incidentsRaw', incidentRawRoutes);
app.use('/api/v1/auth', userRoutes);
app.listen(PORT, () => console.log("It's alive on http://localhost:" + PORT));
connectWithRetry();
