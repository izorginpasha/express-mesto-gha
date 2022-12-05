const express = require('express');//
const mongoose = require('mongoose');//
const bodyParser = require('body-parser');//
const routerUsers = require('./routes/routerUsers');//
const routerCards = require('./routes/routerCards');//
const { Console } = require('console');
// подключаемся к серверу mongo

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
// Слушаем 3000 порт

const { PORT = 3000 } = process.env;//порт
const app = express();//создаем сервер
// подключаем мидлвары, роуты и всё остальное...
app.use((req,res,next)=>{req.user={_id: "638e1267266200ab729b2c61"};next();});//получение постоянного пользователя
app.use(bodyParser.json());
app.use('/users', routerUsers);//роуты на пути user
app.use('/cards', routerCards);//роуты на пути Cards
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {

},()=>{
  console.log("Connected MongoDB");
  app.listen(PORT, () => {//запуск сервера
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
});
