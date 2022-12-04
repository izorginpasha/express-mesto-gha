const mongoose = require('mongoose');
// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {// имя пользователя
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {// информация о пользователе
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,

  },
  avatar:{// ссылка на аватарку
    type: String,
    required: true,
  }

});

// создаём модель и экспортируем её

module.exports = mongoose.model('user', userSchema);