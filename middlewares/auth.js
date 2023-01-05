const jwt = require('jsonwebtoken');
const {
  ERROR_AUTH
} = require("../utils/constants");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(ERROR_AUTH.code)
      .send( {message:ERROR_AUTH.message});
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    console.log(err)
    return res
    .status(ERROR_AUTH.code)
    .send({message:ERROR_AUTH.message});
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};