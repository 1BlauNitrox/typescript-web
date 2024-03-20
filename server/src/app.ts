import express from 'express';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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