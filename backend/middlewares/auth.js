require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/401-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(`${authorization}'Необходима авторизация1'`);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // payload = jwt.verify(token, NODE_ENV === 'production' ? 'secret-key' : 'dev-secret');
  } catch (err) {
    throw new AuthError('Необходима авторизация2');
  }
  req.user = payload;
  next();
};

// const JWT_SECRET = 'secret-key';

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;
//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     throw new AuthError('Вы не авторизованы');
//   }

//   req.user = payload;
//   next();
// };
