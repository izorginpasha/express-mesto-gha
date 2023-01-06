const routerCards = require('express').Router()
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards')
const shemaCards = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),// имя
    link: Joi.string().pattern (new RegExp('(www|http:|https:)+\S*')).required(),// ссылка
    likes:Joi.object().default([]),
    createdAt: Joi.date().default(Date.now),
  }),
})
routerCards.get('/', getCards) //Возвращаеть все карточки
routerCards.post('/',shemaCards, createCard) //создает карточку
routerCards.delete('/:cardId', deleteCard) //удаляет карточку
routerCards.put('/:cardId/likes', likeCard) // ставит лайк
routerCards.delete('/:cardId/likes', dislikeCard) //удаляет лайк

module.exports = routerCards
