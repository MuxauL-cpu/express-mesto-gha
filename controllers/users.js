const User = require('../models/user');
const { NotFound, BadRequest, ServerError } = require('../utils/errors');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(400).send({ message: 'При регистрации были введены некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Ошибка на сервере: ${err}` }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  return User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Пользователь с данным id не найден.' });
      } else if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(ServerError).send({ message: 'Ошибка на сервере' });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, runValidators: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Пользователь с данным id не найден.' });
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Для изменения были введены некорректные данные' });
      } else {
        res.status(ServerError).send({ message: 'Ошибка на сервере' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, runValidators: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(NotFound).send({ message: 'Пользователь с данным id не найден.' });
      } else if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Для изменения были введены некорректные данные' });
      } else {
        res.status(ServerError).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
};
