const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('./errors');

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().regex(regexUrl).required(),
  }),
});

const likeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const cardDelete = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().regex(regexUrl),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().regex(regexUrl),
  }),
});

const userIDValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  regexUrl,
  createCardValidation,
  likeCardValidation,
  cardDelete,
  createUserValidation,
  updateUserValidation,
  updateAvatarValidation,
  userIDValidation,
  loginValidation,
};
