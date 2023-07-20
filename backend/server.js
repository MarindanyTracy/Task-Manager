const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

//Routes
app.get("/", (req, res) => {
  res.send("Home page");
});
//Create a task
app.post('/api/tasks', async(req,res) => {
  console.log(req.body)
  res.send('Task Created')
})

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));


