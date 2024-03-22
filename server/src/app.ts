import express from 'express';
import routes from './routes/index';
import cors from 'cors';
import RedisStore from "connect-redis"
import session from "express-session"
import {createClient} from "redis"

import dotenv from 'dotenv'; 

const app = express();

dotenv.config();

// Initialize client.
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

// Connect to the Redis server
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
})

let secret: string | undefined = process.env.REDIS_SECRET;
if (!secret) {
  throw new Error('REDIS_SECRET is not defined');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));



app.use(
  session({
    store: redisStore,
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 3,
    }
  })
);

// Add routes to the application
app.use('/api', routes); // Assuming your API base path is /api

app.get("/", (req, res) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
