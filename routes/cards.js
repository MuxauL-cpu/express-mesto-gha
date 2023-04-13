const router = require('express').Router();
const {
  createCard,
  getCards,
  putLike,
  deleteLike,
  deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId', deleteCard);
router.delete('/:cardId/likes', deleteLike);

router.use((req, res) => {
  res.status(404).send('Сервер не найден');
});

module.exports = router;
