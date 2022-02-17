const express = require('express');


const { auth } = require('../middleware/auth.js');
const { createToken } = require('../controllers/userController');
const { isValidLogin, isValidLoginUser } = require('./middleware/userValidation');

const { getAllTasks, 
createTask,
getTaskById,
updateTask,
deleteTask } = require('../controllers/taskController');
const router = express.Router();
router.post('/login', isValidLogin, isValidLoginUser, createToken);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);
router.post('/tasks', createTask); 

module.exports = router;