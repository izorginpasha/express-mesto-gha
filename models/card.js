const mongoose = require('mongoose');
// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {// имя
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {//
    type: String,
    required: true,
  },
  owner:{//
    type: Object,
    required: true,
  },
  likes:
    {default:[]}
  ,
  createdAt:{//
    type: Date,
    default: Date.now,
  },

});

// создаём модель и экспортируем её
const model =mongoose.model('card', userSchema);
module.exports =  model;