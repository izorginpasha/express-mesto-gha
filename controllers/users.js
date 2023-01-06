const User = require("../models/user");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  ERROR_NOT_FOUND_DATA,
  ERROR_NECORRECT_DATA,
  ERROR_DEFAULT,
  GOOD,
  CREATE_GOOD,
  ERROR_AUTH
} = require("../utils/constants");

const getUsers = async (req, res) => {
  //получить список пользователеи
  try {
    const users = await User.find({});
    return res.status(GOOD.code).json(users);
  } catch (e) {
    console.error(e);
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message });
  }
};
const login =async (req, res) => {//авторизация получение токена
 try {
    const body = { ...req.body };
    const { password, email } = body;
    if (validator.isEmail(email)) {
      const user = await User.findOne({email}).select('+password');
      if(!user){
        return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message });
      }
    return  bcrypt.compare(password,user.password).then(result =>{
      if (result){
        const token = jwt.sign({ _id: user._id }, 'name_name',{ expiresIn: '7d'});
        return res.status(GOOD.code).json({token});
      }
      return res
      .status(ERROR_NOT_FOUND_DATA.code)
      .json({ message: ERROR_NOT_FOUND_DATA.message });
    })

    }
    return res
      .status(ERROR_NECORRECT_DATA.code)
      .json({ message: ERROR_NECORRECT_DATA.message });
  } catch (e) {
    console.error(e);
    if (e.name === "ValidationError") {
      return res
        .status(ERROR_NECORRECT_DATA.code)
        .json({ message: ERROR_NECORRECT_DATA.message });
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message });
  }
}

const createUser = async (req, res) => {
  //создать пользователя
  try {
    const body = { ...req.body };
    const { password, email } = body;
    if (validator.isEmail(email)) {
       // хешируем пароль
     body.password =   await bcrypt.hash(password, 10);
     // передаем базе
     const user = await User.create(body);
     return res.status(CREATE_GOOD.code).json(user);

    }
    return res
      .status(ERROR_NECORRECT_DATA.code)
      .json({ message: ERROR_NECORRECT_DATA.message });
  } catch (e) {
    console.error(e);
    if (e.code === 11000) {
      return res
        .status(ERROR_AUTH.code)
        .json({ message: ERROR_AUTH.message });
  }
    if (e.name === "ValidationError") {
      return res
        .status(ERROR_NECORRECT_DATA.code)
        .json({ message: ERROR_NECORRECT_DATA.message });
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message });
  }
};
const getUser = async (req, res) => {
  //получить отдельного пользователя
  try {

console.log(req.user);
    const user = await User.findById(req.user._id);

    if (user === null) {
      return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message });
    }
    return res.status(GOOD.code).json(user);
  } catch (e) {
    console.error(e);
    if (e.name === "CastError") {
      return res
        .status(ERROR_NECORRECT_DATA.code)
        .json({ message: ERROR_NECORRECT_DATA.message });
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message });
  }
};
const patchUsers = async (req, res) => {
  //обновить данные пользователя

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
      }
    );

    return res.status(GOOD.code).json(user);
  } catch (e) {
    console.error(e);
    if (e.name === "ValidationError") {
      return res
        .status(ERROR_NECORRECT_DATA.code)
        .json({ message: ERROR_NECORRECT_DATA.message });
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message });
  }
};
const patchAvatarUsers = async (req, res) => {
  //обновить данные аватарки
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
      }
    );

    return res.status(GOOD.code).json(user);
  } catch (e) {
    if (e.name === "ValidationError") {
      return res
        .status(ERROR_NECORRECT_DATA.code)
        .json({ message: ERROR_NECORRECT_DATA.message });
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message });
  }
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  patchUsers,
  patchAvatarUsers,
  login
};
