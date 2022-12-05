const routerCards = require('express').Router()
const { getCards, createCard, deleteCard } = require('../controllers/cards');


routerCards.get('/', getCards) //Возвращаеть все карточки
routerCards.post('/', createCard) //создает карточку
routerCards.delete('/:cardId', deleteCard) //удаляет карточку

module.exports =routerCards;