const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { updateUserValidation, updateAvatarValidation, userIDValidation } = require('../utils/validations');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', userIDValidation, getUser);
userRouter.patch('/me', updateUserValidation, updateUserInfo);
userRouter.patch('/me/avatar', updateAvatarValidation, updateUserAvatar);

module.exports = userRouter;
