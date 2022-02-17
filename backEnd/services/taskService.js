const { getAllTasks } = require('../models/taskModel');

const getAllTasksService = async () => getAllTasks();


module.exports = {
  getAllTasksService,
}