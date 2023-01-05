
const bodyParser = require('body-parser');
const express = require('express');//
const mongoose = require('mongoose');//
const routerUsers = require('./routes/routerUsers');//
const routerCards = require('./routes/routerCards');//
const auth = require('./middlewares/auth');
const { Console } = require('console');
const {
  login,
  createUser
} = require('./controllers/users')
// Слушаем 3000 порт


const { PORT = 3000 } = process.env;//порт
const app = express();//создаем сервер
// подключаем мидлвары, роуты и всё остальное...
app.use(bodyParser.json());
// роуты, не требующие авторизации,
app.post('/signin', login);
app.post('/signup', createUser);
// авторизация
app.use(auth);
app.use('/sing', routerUsers);//роуты на пути user
app.use('/users', routerUsers);//роуты на пути user
app.use('/cards', routerCards);//роуты на пути Cards
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

