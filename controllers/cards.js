const Card = require('../models/card')

const getCards = async (req ,res) => {//получить список карточек
  try{
   const cards = await Card.find({});
   return res.status(200).json(cards);
  }catch(e){
   console.error(e);
   return res.status(500).json("erorr")
  }

 }
 const createCard = async (req ,res) => {//создать карточку
  try{
    console.log(req.body);
    const card = await Card.create(req.body);

    return res.status(201).json(card);

  }catch(e){
    console.error(e);
    return res.status(500).json("erorr")
  }
}
const deleteCard = async (req ,res) => {//удалить карточку
  try{
    const {_id} = req.params;
    const card = await Card.findOneAndDelete(_id);
    if(card===null){
      return res.status(404).json("Card nod found");
    }
    return res.status(200).json("Карточка удалена");

  }catch(e){
    console.error(e);
  return res.status(500).json("erorr");
  }

}

module.exports = {
  getCards,
  createCard,
  deleteCard,
}
