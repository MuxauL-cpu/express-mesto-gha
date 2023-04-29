const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { updateUserValidation, updateAvatarValidation, userIDValidation } = require('../utils/validations');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIDValidation, getUser);
router.patch('/me', updateUserValidation, updateUserInfo);
router.patch('/me/avatar', updateAvatarValidation, updateUserAvatar);

module.exports = router;
