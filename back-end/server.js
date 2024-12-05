const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todoapp'); // no need for options anymore
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

connectDB();
