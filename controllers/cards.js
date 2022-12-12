const Card = require('../models/card')
const {
  ERROR_not_found_data,
  ERROR_necorrect_data,
  ERROR_default,
  Good,
  СreateGood,
} = require('../utils/constants')
const getCards = async (req, res) => {
  //получить список карточек
  try {
    const cards = await Card.find({})
    return res.status(Good.code).json(cards)
  } catch (e) {
    console.error(e)
    return res.status(ERROR_default.code).json(ERROR_default.message)
  }
}
const createCard = async (req, res) => {
  //создать карточку
  try {
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user,
    })

    return res.status(СreateGood.code).json(card)
  } catch (e) {
    console.error(e)
    if (e.name === 'ValidationError') {
      return res
        .status(ERROR_necorrect_data.code)
        .json(ERROR_necorrect_data.message)
    }
    return res.status(ERROR_default.code).json(ERROR_default.message)
  }
}
const deleteCard = async (req, res) => {
  //удалить карточку
  try {
    const { cardId } = req.params

    const card = await Card.findByIdAndRemove(cardId)

    return res.status(Good.code).json(Good.message)
  } catch (e) {
    console.error(e)
    if (e.name === 'ValidationError') {
      return res
        .status(ERROR_necorrect_data.code)
        .json(ERROR_necorrect_data.message)
    }
    return res.status(ERROR_default.code).json(ERROR_default.message)
  }
}
const likeCard = async (req, res) => {
  //лайк карточки
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user } }, // добавить User в массив, если его там нет
      { new: true },
    )

    return res.status(Good.code).json(Good.message)
  } catch (e) {
    console.error(e)
    if (e.name === 'ValidationError') {
      return res
        .status(ERROR_necorrect_data.code)
        .json(ERROR_necorrect_data.message)
    }
    return res.status(ERROR_default.code).json(ERROR_default.message)
  }
}
const dislikeCard = async (req, res) => {
  //дизлайк карточки
  if (req.params.cardId === null) {
    return res
      .status(ERROR_necorrect_data.code)
      .json(ERROR_necorrect_data.message)
  }
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user } }, // убрать _id из массива
      { new: true },
    )

    return res.status(Good.code).json(Good.message)
  } catch (e) {
    console.error(e)
    if (e.name === 'ValidationError') {
      return res
        .status(ERROR_necorrect_data.code)
        .json(ERROR_necorrect_data.message)
    }
    return res.status(ERROR_default.code).json(ERROR_default.message)
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}
