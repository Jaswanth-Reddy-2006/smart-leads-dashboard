import dotenv from 'dotenv';
import { app } from './src/app.js';
import { connectDB } from './src/config/db.js';
import { env } from './src/config/env.js';

dotenv.config();

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer().catch((error: unknown) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
