import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';
import { env } from './env.js';

const getMongoHint = (error: unknown): string | null => {
  if (!(error instanceof MongoServerError)) return null;

  if (error.code === 8000 || error.message.toLowerCase().includes('auth')) {
    return [
      'MongoDB authentication failed.',
      'Check that MONGO_URI uses a valid Atlas Database Access username/password.',
      'If the password contains special characters, URL-encode it.',
      'For Atlas, also confirm Network Access allows your current IP.',
    ].join(' ');
  }

  return null;
};

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error: unknown) {
    const hint = getMongoHint(error);
    if (hint) console.error(hint);
    throw error;
  }
};
