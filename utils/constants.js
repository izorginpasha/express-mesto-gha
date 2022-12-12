const ERROR_not_found_data = { code: 404, message: 'Данные не наидены' }
const ERROR_necorrect_data = { code: 400, message: 'Переданы некорректные данные' }
const ERROR_default = { code: 400, message: 'Ошибка по-умолчанию' }
const Good ={code:200, message:"ok"}
const СreateGood ={code:201, message:"Ресурс создан"}
module.exports = {
  ERROR_not_found_data,
  ERROR_necorrect_data,
  ERROR_default,
  Good,
  СreateGood
}
