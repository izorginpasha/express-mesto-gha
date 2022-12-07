const Card = require('../models/card')

const getCards = async (req, res) => {
  //получить список карточек
  try {
    const cards = await Card.find({})
    return res.status(200).json(cards)
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}
const createCard = async (req, res) => {
  //создать карточку
  try {
    const card = await Card.create(req.body)
    if (card === null) {
      return res.status(400).json('Пререданны некоректные данные карточки')
    }
    if (!card.name) {
      return res.status(400).json('Переданны некоректные данные карточки name')
    }
    if (!card.link) {
      return res.status(400).json('Переданны некоректные данные карточки link')
    }

    return res.status(201).json(card)
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}
const deleteCard = async (req, res) => {
  //удалить карточку
  try {
    const { _id } = req.params
    const card = await Card.findOneAndDelete(_id)
    if (card === null) {
      return res.status(404).json('Карточка не наидена')
    }
    return res.status(200).json('Карточка удалена')
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}
const  likeCard = async (req, res) => {
  //лайк карточки
  try {
    if (req.params.cardId === null) {
      return res.status(400).json('Пререданны некоректные данные карточки')
    }
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    if (card === null) {
      return res.status(404).json('Карточка не наидена')
    }
    return res.status(200).json('like')
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}
const  dislikeCard = async (req, res) => {
  //дизлайк карточки
  if (req.params.cardId === null) {
    return res.status(400).json('Пререданны некоректные данные карточки')
  }
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    if (card === null) {
      return res.status(404).json('Карточка не наидена')
    }
    return res.status(200).json('dislike')
  } catch (e) {
    console.error(e)
    return res.status(500).json('Произошла ошибка')
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}
