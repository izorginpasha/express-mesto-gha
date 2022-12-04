const express = require('express');//
const mongoose = require('mongoose');//
const path = require('path');//
const bodyParser = require('body-parser');//
const router = require('./routes/router');//
const { Console } = require('console');
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {

},()=>{
  console.log("Connected MongoDB");
  app.listen(PORT, () => {//запуск сервера
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
});
// Слушаем 3000 порт

const { PORT = 3000 } = process.env;//порт
const app = express();//создаем сервер
// подключаем мидлвары, роуты и всё остальное...

app.use(bodyParser.json());
app.use('/users', router);//роуты на пути user


