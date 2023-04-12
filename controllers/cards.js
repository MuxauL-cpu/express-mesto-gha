const Card = require('../models/card');

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(400).send({ message: 'Для создания карточки были введены некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Ошибка на сервере: ${err}` }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.status(200).send(card);
      console.log('card was deleted');
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Карточка с данным id не найден.' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
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
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Карточка с данным id не найден.' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
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
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Карточка с данным id не найден.' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = {
  createCard,
  getCard,
  putLike,
  deleteLike,
  deleteCard,
};
