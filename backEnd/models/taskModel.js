const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getUserByEmail = async (email) => {
  const conn = await connect();
  const findUserByEmail = await conn.collection('users').findOne({ email });
  return findUserByEmail;
};

const getAllTasks = async () => {
  const conn = await connect();
  const allTasks = await conn.collection('tasks').find().toArray();
  return allTasks;
};

module.exports = {
getAllTasks,
getUserByEmail,
};