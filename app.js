const express = require('express');//
const mongoose = require('mongoose');//
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();
// подключаем мидлвары, роуты и всё остальное...


app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})