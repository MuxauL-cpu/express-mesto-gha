const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof 'ValidationError') {
        next(new BadRequestError('Для создания карточки были введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .orFail(() => new Error('NotFound'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Card.findByIdAndRemove(cardId)
          .then(res.status(200).send(card))
          .catch(next);
      }
      throw new ForbiddenError('Ошибка доступа, нельзя удалять чужие карточки.');
    })
    .catch((err) => {
      if (err instanceof 'NotFound') {
        next(new NotFoundError('Карточка с данным id не найдена.'));
      } else if (err instanceof 'CastError') {
        next(new BadRequestError('Были введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const putLike = (req, res, next) => {
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
    .orFail(() => new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof 'NotFound') {
        next(new NotFoundError('Карточка с данным id не найдена.'));
      } else if (err instanceof 'CastError') {
        next(new BadRequestError('Были введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
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
    .orFail(() => new Error('NotFound'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof 'NotFound') {
        next(new NotFoundError('Карточка с данным id не найдена.'));
      } else if (err instanceof 'CastError') {
        next(new BadRequestError('Были введены некорректные данные'));
      } else {
        next(err);
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
