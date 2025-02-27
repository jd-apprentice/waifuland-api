// External Modules
import helmet from 'helmet';
import express from 'express';
import cors from 'cors';

// Internal Modules
import { routes } from './routes/index';
import { corsConfiguration } from './constants/cors';

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsConfiguration));
app.use(helmet());
app.use('/v1/api', routes);
app.use('/', (req, res) =>
  res.status(200).json({ message: 'Allo! Catch-all route.' }),
);

export { app };
