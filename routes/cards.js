const cardRouter = require('express').Router();
const {
  createCard,
  getCards,
  putLike,
  deleteLike,
  deleteCard,
} = require('../controllers/cards');
const { createCardValidation, likeCardValidation, cardDelete } = require('../utils/validations');

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValidation, createCard);
cardRouter.put('/:cardId/likes', likeCardValidation, putLike);
cardRouter.delete('/:cardId', cardDelete, deleteCard);
cardRouter.delete('/:cardId/likes', cardDelete, deleteLike);

module.exports = cardRouter;
