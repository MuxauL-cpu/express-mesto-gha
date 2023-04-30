const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const cardRouter = require('./cards');
const userRouter = require('./users');

router.use('/cards', cardRouter);
router.use('/users', userRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Сервер не найден.'));
});

module.exports = router;
