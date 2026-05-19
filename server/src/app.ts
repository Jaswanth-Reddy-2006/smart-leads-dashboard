import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import leadsRoutes from './routes/leads.routes.js';
import { ApiError } from './utils/ApiError.js';
import { ApiResponse } from './utils/ApiResponse.js';

export const app = express();

app.use(helmet());
const corsOrigins = env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN.split(',');
app.use(cors({ 
  origin: corsOrigins.length === 1 ? corsOrigins[0] : corsOrigins, 
  credentials: true 
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (_req: Request, res: Response): void => {
  res.status(200).json(new ApiResponse({ status: 'ok' }, 'Healthy'));
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);

app.use((_req: Request, _res: Response): void => {
  throw new ApiError(404, 'Route not found');
});

app.use(errorHandler);
