require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
//const cors = require('cors');

const app = express();

// Connect to DB
connectDB();

// Middleware
//app.use(cors());
app.use(express.json());

// Routes (you'll add real ones later)
app.get('/', (req, res) => {
  res.send('🚀 Club Revenue Backend Running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
