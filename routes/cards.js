const router = require('express').Router();
const {
  createCard,
  getCards,
  putLike,
  deleteLike,
  deleteCard,
} = require('../controllers/cards');
const { createCardValidation, likeCardValidation, cardDelete } = require('../utils/validations');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.put('/:cardId/likes', likeCardValidation, putLike);
router.delete('/:cardId', cardDelete, deleteCard);
router.delete('/:cardId/likes', cardDelete, deleteLike);

module.exports = router;
