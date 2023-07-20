const express = require('express');
const dotenv = require("dotenv").config()
const connectDB = require('./config/connectDB')

const app = express();

app.get('/', (req,res) => {
  res.send('Home page')
})
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
