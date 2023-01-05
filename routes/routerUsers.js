const router = require('express').Router()
const {
  getUsers,
  getUser,
  createUser,
  patchUsers,
  patchAvatarUsers,
} = require('../controllers/users')

router.get('/', getUsers) //Возвращаеть всех пользователей
router.get('/me', getUser) //возвращает текущего пользователя
router.post('/', createUser) //создает пользователя
router.patch('/me', patchUsers) //обновляет профиль
router.patch('/me/avatar', patchAvatarUsers) //обновляет аватар

module.exports = router
