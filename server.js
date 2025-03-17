// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const imageRoutes = require('./routes/imageRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const cors = require('cors');


dotenv.config();
const PORT = process.env.PORT;
const app = express();

// Enable CORS for all origins
app.use(cors());

// Alternatively, enable CORS for specific origin
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests only from your React app's port
// }));


// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB', `${process.env.MONGODB_URI}`))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// User routes
app.use('/api/users', userRoutes); // All user-related routes prefixed with '/api/users'

// Use image upload routes
app.use('/api', imageRoutes);

//Inquiries Routes
app.use('/api', inquiryRoutes);


const BASE_URL = process.env.BASE_URL;

app.get("/", (req, res) => {
	res.send("API is running..");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
	console.log(`Base URL: ${BASE_URL}`);
});
