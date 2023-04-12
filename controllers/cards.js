const Card = require('../models/card');

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => console.log(`Ошибка: ${err}`));
};

const getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send(card));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.status(200).send(card);
      console.log('card was deleted');
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
};

const putLike = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      res.status(200).send(card);
      console.log('liked');
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      res.status(200).send(card);
      console.log('disliked');
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
};

module.exports = {
  createCard,
  getCard,
  putLike,
  deleteLike,
  deleteCard,
};
