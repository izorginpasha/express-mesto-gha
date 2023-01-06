const mongoose = require('mongoose')
// Опишем схему:
// const shemaCards = celebrate({
//   [Segments.BODY]: Joi.object().keys({
//     name: Joi.string().min(2).max(30).required(),// имя
//     link: Joi.string().required(),// ссылка
//     owner:Joi.object().required(),
//     likes:Joi.object().default([]),
//     createdAt: Joi.date().default(Date.now),
//   }),
// })
const userSchema = new mongoose.Schema({
  name: {
    // имя
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    //
    type: String,
    required: true,
  },
  owner: {
    //
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],

  createdAt: {
    //
    type: Date,
    default: Date.now,
  },
})

// создаём модель и экспортируем её
const model = mongoose.model('card', userSchema)
module.exports = model
