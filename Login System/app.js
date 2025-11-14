const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Define your allowed origin
const allowedOrigin = "http://localhost:3000"; // Replace with your frontend's domain

app.use(
  cors({
    origin: allowedOrigin, // Specify the exact origin
    credentials: true, // Allow credentials
  })
);

dotenv.config({ path: "./.env" });
require("./db/conn");
app.use(express.json());
app.use(require("./router/user"));
app.use(require("./router/booking"));

const PORT = parseInt(process.env.PORT, 10) || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running at PORT Number ${PORT}`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    const fallback = PORT + 1;
    console.error(`Port ${PORT} is already in use. Trying port ${fallback}...`);
    app.listen(fallback, () => {
      console.log(`Server is running at PORT Number ${fallback}`);
    }).on('error', (err2) => {
      console.error('Failed to bind to fallback port:', err2);
      process.exit(1);
    });
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
