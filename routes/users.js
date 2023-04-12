const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

router.use((req, res) => {
  res.status(404).send('Сервер не найден');
});

module.exports = router;
