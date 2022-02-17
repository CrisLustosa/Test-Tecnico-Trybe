const rescue = require('express-rescue');

const { getAllTasksService } = require('../services/taskService');

const { unprocessableEntity, success, created } = require('../utils/dictionary/statusCode');

const getAllTasks = rescue(async (_req, res) => {
  const allTasks = await getAllTasksService();

  if (!allTasks) {
    return res.status(unprocessableEntity).json({ err: 'DB not found' });
  }

  return res.status(success).json({ tasks: allTasks });
});

const getTaskById = rescue(async (req, res) => {
  const { id } = req.params;
  const findById = await getTaskById(id);

  if (!findById) {
    return res.status(unprocessableEntity).json({ err: 'ID not found' });
  }

  return res.status(success).json(findById);
});

const createTask = rescue(async (req, res) => {
  const { name } = req.body;
  const newTask = await createTask(name);

  return res.status(created).json(newTask);
});

const updateTask = rescue(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const update = await updateTask(id, name);

  return res.status(200).json(update);
});

const deleteTask = rescue(async (req, res) => {
  const { id } = req.params;
  const deleteData = await deleteTask(id);

  if (!deleteData) {
    return res.status(unprocessableEntity).json({ err: 'ID not found' });
  }

  return res.status(success).json(deleteData);
});
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};