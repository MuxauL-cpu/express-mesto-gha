const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUserInfo);

module.exports = router;
