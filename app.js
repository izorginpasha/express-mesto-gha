
const bodyParser = require('body-parser');
const express = require('express');//
const mongoose = require('mongoose');//
const routerUsers = require('./routes/routerUsers');//
const routerCards = require('./routes/routerCards');//
const auth = require('./middlewares/auth');
const { Console } = require('console');
const { errors  } = require('celebrate');
const {
  login,
  createUser
} = require('./controllers/users')
// Слушаем 3000 порт
const { celebrate, Joi, Segments } = require('celebrate');
const shemaUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),// имя пользователя
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30).default('Исследователь'), // информация о пользователе
    avatar: Joi.string().pattern (new RegExp('(www|http:|https:)+\S*')).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')// ссылка на аватарку
  }),
})
const shemaCards = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),// имя
    link: Joi.string().pattern (new RegExp('(www|http:|https:)+\S*')).required(),// ссылка
    likes:Joi.object().default([]),
    createdAt: Joi.date().default(Date.now),
  }),
})
const { PORT = 3000 } = process.env;//порт
const app = express();//создаем сервер
// подключаем мидлвары, роуты и всё остальное...
app.use(bodyParser.json());
// роуты, не требующие авторизации,
app.post('/signin',shemaUser, login);
app.post('/signup',shemaUser, createUser);
// авторизация
app.use(auth);
app.use('/sing',shemaUser, routerUsers);//роуты на пути user
app.use('/users',shemaUser, routerUsers);//роуты на пути user
app.use('/cards',routerCards);//роуты на пути Cards
app.all('*', function (req, res) {//обработка неправильных путей
  console.log('404 handler..')
  res.status(404).json({ message: 'Произошла ошибка' })
});

try {
  mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {

  }, () => {
    console.log("Connected MongoDB");
    app.listen(PORT, () => {//запуск сервера
      // Если всё работает, консоль покажет, какой порт приложение слушает
      console.log(`App listening on port ${PORT}`)
    })
  })
} catch {
  console.log("not connected MongoDB");

}
app.use(errors());
