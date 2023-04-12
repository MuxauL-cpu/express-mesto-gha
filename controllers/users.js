const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user));
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
};
