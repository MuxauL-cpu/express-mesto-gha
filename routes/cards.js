const router = require('express').Router();
const {
  createCard,
  getCard,
  putLike,
  deleteLike,
  deleteCard,
} = require('../controllers/cards');

router.get('/', getCard);
router.post('/', createCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId', deleteCard);
router.delete('/:cardId/likes', deleteLike);

router.use((req, res) => {
  res.status(404).send('SERVER NOT FOUND');
});

module.exports = router;
