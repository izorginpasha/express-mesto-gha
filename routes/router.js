const router = require('express').Router()
const { getUsers, getUser, createUser } = require('../controllers/users');


router.get('/users', getUsers) //Возвращаеть всех пользователей
router.get('/users/:userId', getUser) //возвращает пользователя по id
router.post('/users', createUser) //создает пользователя

module.exports =router;