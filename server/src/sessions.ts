import express from 'express';
import { Session } from 'express-session';

// Define an interface for the extended session
export interface CustomSession extends Session {
  userId: number;
  username: string;
  email: string;
  token: string;
}

// Augment the Express Request interface to include the custom session
declare module 'express' {
  interface Request {
    session: CustomSession;
  }
}