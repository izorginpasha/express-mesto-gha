const router = require('express').Router()
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUsers,
  getUser,
  createUser,
  patchUsers,
  patchAvatarUsers,
} = require('../controllers/users')

const shemaUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),// имя пользователя
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30).default('Исследователь'), // информация о пользователе
    avatar: Joi.string().pattern (new RegExp('(www|http:|https:)+\S*')).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')// ссылка на аватарку
  }),
})
router.get('/', getUsers) //Возвращаеть всех пользователей
router.get('/me', getUser) //возвращает текущего пользователя
router.post('/', shemaUser,createUser) //создает пользователя
router.patch('/me', patchUsers) //обновляет профиль
router.patch('/me/avatar', patchAvatarUsers) //обновляет аватар

module.exports = router
