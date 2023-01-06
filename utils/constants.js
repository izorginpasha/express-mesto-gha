const ERROR_NOT_FOUND_DATA = { code: 404, message: 'Данные не наидены' }
const ERROR_NECORRECT_DATA = {
  code: 400,
  message: 'Переданы некорректные данные',
}
const ERROR_DEFAULT = { code: 400, message: 'Ошибка по-умолчанию' }
const GOOD = { code: 200, message: 'ok' }
const CREATE_GOOD = { code: 201, message: 'Ресурс создан' }
const ERROR_AUTH= { code: 401, message: 'Необходима авторизация' }
module.exports = {
  ERROR_NOT_FOUND_DATA,
  ERROR_NECORRECT_DATA,
  ERROR_DEFAULT,
  GOOD,
  CREATE_GOOD,
  ERROR_AUTH
}
