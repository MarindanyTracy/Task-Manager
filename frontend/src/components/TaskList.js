import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TaskForm from './TaskForm';
import {toast} from 'react-toastify';
import Task from './Task'
import { URL } from '../App';
import loadingImg from '../assets/loader.gif';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData,setFormData] = useState({
    name: '',
    completed: false
  })
  const [isEditing, setIsEditing] = useState(false)
  const [taskID, setTaskID] = useState('')

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  const getTasks = async() => {
    setIsLoading(true);
    try {
      const {data} = await axios.get(`${URL}/api/tasks`);
      setTasks(data)
      setIsLoading(false )
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])
  const createTask = async(e) => {
    e.preventDefault();
    if(name === '') {
      return toast.error('Input field can\'t be empty');
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success('Task added successfully')
      setFormData({...formData, name: ""})
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteTask = async(id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getSingleTask = async (task) =>  {
    setFormData({name: task.name, completed: false})
    setTaskID(task._id);
    setIsEditing(true)
  }

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true
    })
    setCompletedTasks(cTask)
  }, [tasks])
  const updateTask = async (e) => {
    e.preventDefault()
    if (name === '') {
      return toast.error('Input field can\'t be empty')
    } 
    try {
      await axios.put(`${URL}/api/tasks/${taskID}`, formData);
      setFormData({...formData, name: ""})
      setIsEditing(false);
      getTasks()
    } catch (error) {
      toast.error(error.message);
    }
  }

  const setToComplete = async(task) => {
    const newFormData = {
      name: task.name,
      completed: true
    }
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div> 
      <h2>Task Manager</h2>
      <TaskForm name={ name } updateTask={updateTask} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} />
      {tasks.length > 0 && (
      <div className='--flex-between --pb'>
        <p><b>Total tasks: </b> {tasks.length}</p>
        <p><b>Completed tasks: </b> {completedTasks.length}</p>
      </div>
      )}
      <hr />
      {
        isLoading && (
          <div className='--flex-center'>
            <img src={loadingImg} alt="LOADING!!!" />
          </div>
         )
      }
      {
        !isLoading && tasks.length === 0 ? (
          <p className='--py'>No task added, please add a task</p>
        ) : (
          <>
          {tasks.map((task,index) => {
            return (
              <Task key={task._id} setToComplete={setToComplete}  getSingleTask={getSingleTask} deleteTask={deleteTask} task={task} index={index} />
            )
          })}
          </>
        )
      }
     
    </div>
  )
}

export default TaskList
