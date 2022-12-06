const routerCards = require('express').Router()
const { getCards, createCard, deleteCard, likeCard, dislikeCard} = require('../controllers/cards');


routerCards.get('/', getCards) //Возвращаеть все карточки
routerCards.post('/', createCard) //создает карточку
routerCards.delete('/:cardId', deleteCard) //удаляет карточку
routerCards.put('/:cardId/likes', likeCard) // ставит лайк
routerCards.delete('/:cardId/likes', dislikeCard) //удаляет лайк

module.exports =routerCards;