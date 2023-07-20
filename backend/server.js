const express = require('express');
const dotenv = require("dotenv").config()
const connectDB = require('./config/connectDB')

const app = express();

app.get('/', (req,res) => {
  res.send('Home page')
})
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()