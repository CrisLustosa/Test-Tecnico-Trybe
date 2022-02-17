const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/usersModel');
const { unauthorized } = require('../utils/dictionary/statusCode');

const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(unauthorized).json({ message: 'missing auth token' });
    }
    const decoded = jwt.verify(token, secret);
    
    const user = await getUserByEmail(decoded.email);

    if (!user) {
      return res.status(unauthorized).json({ message: 'jwt malformed' });
    }
    
    req.user = user;
    next();
  } catch (err) {
        return res.status(unauthorized).json({ message: 'jwt malformed' });
  }
};

module.exports = { auth }; 