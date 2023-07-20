const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();

//Create a task
router.post('/api/tasks', async(req,res) => {
  try {
   const task = await Task.create(req.body)
   res.status(201).json(task)
  } catch (error) {
   res.status(500).json({msg: error.message})
  }
 })

 //Read data
router.get('/api/tasks', async (req,res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
})


module.exports = router;

