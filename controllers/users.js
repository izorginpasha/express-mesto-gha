const User = require('../models/user')

const {
  ERROR_NOT_FOUND_DATA,
  ERROR_NECORRECT_DATA,
  ERROR_DEFAULT,
  GOOD,
  CREATE_GOOD,
} = require('../utils/constants')

const getUsers = async (req, res) => {
  //получить список пользователеи
  try {
    const users = await User.find({})
    return res.status(GOOD.code).json(users)
  } catch (e) {
    console.error(e)
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
  }
}
const getUser = async (req, res) => {
  //получить отдельного пользователя
  try {
    const { _id } = req.params

    const user = await User.findById(_id)

    if (user === null) {
      return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message })
    }
    return res.status(GOOD.code).json(user)
  } catch (e) {
    console.error(e)
    if (e.name === 'CastError') {
      return res
        .status(ERROR_NECORRECT_DATA.code)
        .json({ message: ERROR_NECORRECT_DATA.message })
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
  }
}
const createUser = async (req, res) => {
  //создать пользователя
  try {
    const body = {...req.body}
    const {password, email } = body


    const user = await User.create(req.body)

    return res.status(CREATE_GOOD.code).json(user)
  } catch (e) {
    console.error(e)
    if (e.name === 'ValidationError') {
      return res
        .status(ERROR_NECORRECT_DATA.code)
        .json({ message: ERROR_NECORRECT_DATA.message })
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
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

    return res.status(GOOD.code).json(user)
  } catch (e) {
    console.error(e)
    if (e.name === 'ValidationError') {
      return res
        .status(ERROR_NECORRECT_DATA.code)
        .json({ message: ERROR_NECORRECT_DATA.message })
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
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

    return res.status(GOOD.code).json(user)
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res
        .status(ERROR_NECORRECT_DATA.code)
        .json({ message: ERROR_NECORRECT_DATA.message })
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
  }
}
module.exports = {
  getUsers,
  getUser,
  createUser,
  patchUsers,
  patchAvatarUsers,
}
