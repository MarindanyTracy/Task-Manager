const express = require("express");
const Task = require("../models/taskModel");
const { createTask, getTasks } = require("../controllers/taskController");


const router = express.Router();

router.post('/api/tasks', createTask)

router.get('/api/tasks', getTasks)


module.exports = router;

