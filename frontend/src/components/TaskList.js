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
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm name={ name } handleInputChange={handleInputChange} createTask={createTask} />
      <div className='--flex-between --pb'>
        <p><b>Total tasks: </b> 0</p>
        <p><b>Completed tasks: </b> 0</p>
      </div>
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
              <Task key={task._id} task={task} index={index} />
            )
          })}
          </>
        )
      }
     
    </div>
  )
}

export default TaskList
