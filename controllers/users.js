const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { NotFound, BadRequest, ServerError } = require('../utils/errors');

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => res.send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(BadRequest).send({ message: 'При регистрации были введены некорректные данные' });
          } else if (err.code === 11000) {
            res.send({ message: 'Такой пользователь уже существует' });
          }
        });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Ошибка на сервере: ${err}` }));
};

const getUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => new Error('NotFound'))
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
  login,
};
