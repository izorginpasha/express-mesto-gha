const express = require('express') //
const mongoose = require('mongoose') //
const routerUsers = require('./routes/routerUsers') //
const routerCards = require('./routes/routerCards') //
const { Console } = require('console')

// Слушаем 3000 порт

const { PORT = 3000 } = process.env //порт
const app = express() //создаем сервер
// подключаем мидлвары, роуты и всё остальное...

app.use((req, res, next) => {
  req.user = { _id: '6391f03e7917e106def7afa4' }
  next()
}) //получение постоянного пользователя

express.json()
app.use('/users', routerUsers) //роуты на пути user
app.use('/cards', routerCards) //роуты на пути Cards
app.get('*', function (req, res) {
  //обработка неправильных путей
  console.log('404 handler..')
  res.status(404).json({ message: 'Произошла ошибка' })
})
app.all('*', function (req, res) {
  //обработка неправильных путей
  console.log('404 handler..')
  res.status(404).json({ message: 'Произошла ошибка' })
})

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(
    console.log('Connected MongoDB'),
    app.listen(PORT, () => {
      //запуск сервера
      // Если всё работает, консоль покажет, какой порт приложение слушает
      console.log(`App listening on port ${PORT}`)
    }),
  )
  .catch(console.log('not connected MongoDB'))
