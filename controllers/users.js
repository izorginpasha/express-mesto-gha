const User = require('../models/user');

const getUsers = async (req ,res) => {//получить список пользователеи
 try{
  const users = await User.find({});
  return res.status(200).json(users);
 }catch(e){
  console.error(e);
  return res.status(500).json("erorr")
 }

}
const getUser = async (req ,res) => {//получить отдельного пользователя
  try{
    const {_id} = req.params;
    const user = await User.findById(_id);
    if(user===null){
      return res.status(404).json("User nod found");
    }
    return res.status(200).json(user);

  }catch(e){
    console.error(e);
  return res.status(500).json("erorr");
  }

}
const createUser = async (req ,res) => {//создать пользователя
  try{
    console.log(req.body);
    const user = await User.create(req.body);

    return res.status(201).json(user);

  }catch(e){
    console.error(e);
    return res.status(500).json("erorr")
  }
}
module.exports ={
  getUsers,
  getUser,
  createUser,
}