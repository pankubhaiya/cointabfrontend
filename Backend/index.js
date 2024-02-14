// server.js

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mongoose = require('mongoose');
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 

// Connect to MongoDB database
mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  website: String,
  city: String,
  company: String,
});
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Fetch users from the specified API
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get('http://jsonplaceholder.typicode.com/users');
    const users = response.data;
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users from API' });
  }
});

// Add user to the database
app.post('/api/users', async (req, res) => {
  try {
    const user = req.body;
    await User.create(user);
    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add user to the database' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
