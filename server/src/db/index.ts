import mysql from "mysql2";
import config from "../config/db.config";

// Create the MySQL connection
const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB
});

// Function to create tables if they don't exist
function createTables() {
  connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      UNIQUE KEY unique_name (name),
      UNIQUE KEY unique_email (email)
    );
  `, (error, results) => {
    if (error) {
      console.error('Error creating tables:', error);
    } else {
      console.log('Tables created successfully (if they did not exist already)');
    }
  });
}

// Call the function to create tables when the connection is established
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
    createTables();
  }
});

export default connection;
