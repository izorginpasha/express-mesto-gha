const router = require('express').Router()
const { getUsers, getUser, createUser } = require('../controllers/users');


router.get('/', getUsers) //Возвращаеть всех пользователей
router.get('/:_id', getUser) //возвращает пользователя по id
router.post('/', createUser) //создает пользователя

module.exports =router;