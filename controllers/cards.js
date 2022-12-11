const Card = require('../models/card')

const getCards = async (req, res) => {
  //получить список карточек
  try {
    const cards = await Card.find({})
    return res.status(200).json(cards)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Произошла ошибка' })
  }
}
const createCard = async (req, res) => {
  //создать карточку
  try {
    if (req.body === null) {
      return res
        .status(400)
        .json({ message: 'Пререданны некоректные данные карточки' })
    }
    if (!req.body.name) {
      return res
        .status(400)
        .json({ message: 'Переданны некоректные данные карточки name' })
    }
    if (!req.body.link) {
      return res
        .status(400)
        .json({ message: 'Переданны некоректные данные карточки link' })
    }

    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user,
    })
    console.log(req.user)

    return res.status(201).json(card)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Произошла ошибка' })
  }
}
const deleteCard = async (req, res) => {
  //удалить карточку
  try {
    const { cardId } = req.params

    const card = await Card.findByIdAndRemove(cardId)
    if (card === null) {
      return res.status(404).json({ message: 'Карточка не наидена' })
    }
    return res.status(200).json({ message: 'Карточка удалена' })
  } catch (e) {
    console.error(e)
    return res.status(400).json({ message: 'Произошла ошибка' })
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
      return res.status(404).json({ message: 'Карточка не наидена' })
    }
    return res.status(200).json('like')
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Произошла ошибка' })
  }
}
const dislikeCard = async (req, res) => {
  //дизлайк карточки
  if (req.params.cardId === null) {
    return res
      .status(400)
      .json({ message: 'Пререданны некоректные данные карточки' })
  }
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user } }, // убрать _id из массива
      { new: true },
    )
    if (card === null) {
      return res.status(404).json({ message: 'Карточка не наидена' })
    }
    return res.status(200).json('dislike')
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Произошла ошибка' })
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}
