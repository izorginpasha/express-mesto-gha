const jwt = require("jsonwebtoken");
const { ERROR_AUTH } = require("../utils/constants");
const AuthErors = require("../erors/AuthErors");
const {  key } = require("../utils/constants");
module.exports = (req, res, next) => {


  if (localStorage.getItem('jwt')) {

  const token = localStorage.getItem('jwt');
  let payload;

  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    console.log(err);
    return next(new AuthErors("Передан неверный логин или пароль"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
console.log(req.user);
  next();
 } // пропускаем запрос дальше
};
