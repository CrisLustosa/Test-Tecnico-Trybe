const { getUserByEmail } = require('../models/usersModel');
const { unauthorized } = require('../utils/dictionary/statusCode');

const isValidLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(unauthorized).json({ message: 'All fields must be filled' });
  }
  next();
};

const isValidLoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user || password !== user.password) {
    return res.status(unauthorized).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = {
isValidLogin,
isValidLoginUser,
};