const Card = require('../models/card');
const { NotFound, BadRequest, ServerError } = require('../utils/errors');

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Для создания карточки были введены некорректные данные' });
      } else {
        res.status(ServerError).send({ message: 'Ошибка на сервере' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(ServerError).send({ message: `Ошибка на сервере: ${err}` }));
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
        res.status(NotFound).send({ message: 'Карточка с данным id не найдена.' });
      } else if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Были введены некорректные данные' });
      } else {
        res.status(ServerError).send({ message: 'Ошибка на сервере' });
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
    .orFail()
    .then((card) => {
      res.status(200).send(card);
      console.log('liked');
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Карточка с данным id не найдена.' });
      } else if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Были введены некорректные данные' });
      } else {
        res.status(ServerError).send({ message: 'Ошибка на сервере' });
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
    .orFail()
    .then((card) => {
      res.status(200).send(card);
      console.log('disliked');
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Карточка с данным id не найдена.' });
      } else if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Были введены некорректные данные' });
      } else {
        res.status(ServerError).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = {
  createCard,
  getCards,
  putLike,
  deleteLike,
  deleteCard,
};
