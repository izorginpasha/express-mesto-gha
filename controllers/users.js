const User = require('../models/user')

const getUsers = async (req, res) => {
  //получить список пользователеи
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}
const getUser = async (req, res) => {
  //получить отдельного пользователя
  try {
    const { _id } = req.params

    const user = await User.findById(_id)
    if (user === null) {
      return res.status(404).json('Пользователь не наиден')
    }
    return res.status(200).json(user)
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}
const createUser = async (req, res) => {
  //создать пользователя
  try {
    console.log(req.body)
    const user = await User.create(req.body)
    if (!user.name ) {
      return res.status(400).json('Переданны некоректные данные user')
    }
    if (!user.about ) {
      return res.status(400).json('Переданны некоректные данные about')
    }
    return res.status(201).json(user)
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}
const patchUsers = async (req, res) => {
  //обновить данные пользователя
  try {
    const user = await User.findByIdAndUpdate(req.user._id)
    if (user === null) {
      return res.status(404).json('Пользователь не наиден')
    }
    return res.status(201).json(user)
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}
const patchAvatarUsers = async (req, res) => {
  //обновить данные аватарки
  try {
    if (req.user._id === null) {
      return res.status(400).json('Пререданны некоректные данные пользователя')
    }
    const user = await User.findByIdAndUpdate(req.user._id, { avatar: '132' })
    if (user === null) {
      return res.status(404).json('Пользователь не наиден')
    }
    return res.status(201).json(user)
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}
module.exports = {
  getUsers,
  getUser,
  createUser,
  patchUsers,
  patchAvatarUsers,
}
