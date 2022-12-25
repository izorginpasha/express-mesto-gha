const Card = require('../models/card')
const User = require('../models/user')
const {
  ERROR_NOT_FOUND_DATA,
  ERROR_NECORRECT_DATA,
  ERROR_DEFAULT,
  GOOD,
  CREATE_GOOD,
} = require('../utils/constants')
const getCards = async (req, res) => {
  //получить список карточек
  try {
    const cards = await Card.find({}).populate(['owner', 'likes'])
    return res.status(GOOD.code).json(cards)
  } catch (e) {
    console.error(e)
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
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
    return res.status(CREATE_GOOD.code).json(card)
  } catch (e) {
    console.error(e)
    if (e.name === 'ValidationError') {
      return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message })
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
  }
}
const deleteCard = async (req, res) => {
  //удалить карточку
  try {
    const { cardId } = req.params

    const card = await Card.findByIdAndRemove(cardId)
    if (card === null) {
      return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message })
    }
    return res.status(GOOD.code).json(GOOD.message)
  } catch (e) {
    console.error(e)
    if (e.name === 'CastError') {
      return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message })
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
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
    if (card === null) {
      return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message })
    }
    const newCard = await Card.find({ _id: req.params.cardId }).populate([
      'owner',
      'likes',
    ])

    return res.status(GOOD.code).json(newCard)
  } catch (e) {
    console.error(e)
    if (e.name === 'CastError') {
      return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message })
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
  }
}
const dislikeCard = async (req, res) => {
  //дизлайк карточки
  if (req.params.cardId === null) {
    return res
      .status(ERROR_NOT_FOUND_DATA.code)
      .json({ message: ERROR_NOT_FOUND_DATA.message })
  }
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    if (card === null) {
      return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message })
    }
    const newCard = await Card.find({ _id: req.params.cardId }).populate([
      'owner',
      'likes',
    ])
    return res.status(GOOD.code).json(newCard)
  } catch (e) {
    console.error(e)
    if (e.name === 'CastError') {
      return res
        .status(ERROR_NOT_FOUND_DATA.code)
        .json({ message: ERROR_NOT_FOUND_DATA.message })
    }
    return res
      .status(ERROR_DEFAULT.code)
      .json({ message: ERROR_DEFAULT.message })
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}
