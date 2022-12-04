const User = require('../models/user');

const getUsers = async (req ,res) => {//получить список пользователеи
 try{
  const user = await User.find({});
  return res.status(200).send({user});
 }catch(e){
  console.error(e);
  return res.status(500).send("erorr")
 }

}
const getUser = (req ,res) => {//получить отдельного пользователя
  return res.status(200).send({getUser:true});
}
const createUser = (req ,res) => {//создать пользователя
  return res.status(200).send({createUser:true});
}
module.exports ={
  getUsers,
  getUser,
  createUser,
}