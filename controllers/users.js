const User = require('../models/user')
const {
  ERROR_not_found_data,
  ERROR_necorrect_data,
  ERROR_default ,
  Good,
  СreateGood
} = require('../utils/constants')

const getUsers = async (req, res) => {
  //получить список пользователеи
  try {
    const users = await User.find({})
    return res.status(Good.code).json(users)
  } catch (e) {
    console.error(e)
    return res.status(ERROR_default.code).json({message: ERROR_default.message})
  }
}
const getUser = async (req, res) => {
  //получить отдельного пользователя
  try {
    const { _id } = req.params

    const user = await User.findById(_id)

    if (user === null) {
      return res
      .status(ERROR_not_found_data.code)
      .json({message: ERROR_not_found_data.message})
    }
    return res.status(Good.code).json(user)
  } catch (e) {
    console.error(e)
    if(e.name==="CastError"){
      return res
      .status(ERROR_necorrect_data.code)
      .json({message: ERROR_necorrect_data.message})
    }
    return res.status(ERROR_default.code).json({message: ERROR_default.message})
  }
}
const createUser = async (req, res) => {
  //создать пользователя
  try {

    const user = await User.create(req.body)

    return res.status(СreateGood.code).json(user)
  } catch (e) {
    console.error(e)
    if(e.name==="ValidationError"){
      return res
      .status(ERROR_necorrect_data.code)
      .json({message: ERROR_necorrect_data.message})
    }
    return res.status(ERROR_default.code).json({message: ERROR_default.message})
  }
}
const patchUsers = async (req, res) => {
  //обновить данные пользователя

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
      },
    )

    return res.status(Good.code).json(user)
  } catch (e) {
    console.error(e)
    if(e.name==="ValidationError"){
      return res
      .status(ERROR_necorrect_data.code)
      .json({message: ERROR_necorrect_data.message})
    }
    return res.status(ERROR_default.code).json({message: ERROR_default.message})
  }
}
const patchAvatarUsers = async (req, res) => {
  //обновить данные аватарки
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
      },
    )


    return res.status(Good.code).json(user)
  } catch (e) {
    if(e.name==="ValidationError"){
      return res
      .status(ERROR_necorrect_data.code)
      .json({message: ERROR_necorrect_data.message})
    }
    return res.status(ERROR_default.code).json({message: ERROR_default.message})
  }
}
module.exports = {
  getUsers,
  getUser,
  createUser,
  patchUsers,
  patchAvatarUsers,
}
