const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { createUserService } = require('../services/usersService');
const { created, success } = require('../utils/dictionary/statusCode');
const { getUserByEmail } = require('../models/usersModel');

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await createUserService({ name, email, password });

  return res.status(created).json({ user: result });
});

const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const createToken = rescue(async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  const jwtConfig = {
    expiresIn: '10m',
    algorithm: 'HS256',
  };

  const { _id, role } = user;

  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
    return res.status(success).json({ token });
});
module.exports = {
  createUser,
  createToken,
}; 