const router = require('express').Router()
const { getUsers, getUser, createUser,patchUsers,patchAvatarUsers } = require('../controllers/users');


router.get('/', getUsers) //Возвращаеть всех пользователей
router.get('/:_id', getUser) //возвращает пользователя по id
router.post('/', createUser) //создает пользователя
router.patch('/me', patchUsers)//обновляет профиль
router.patch('/me/avatar', patchAvatarUsers)//обновляет аватар

module.exports =router;