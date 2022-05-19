const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getMyUser,
  getUsers,
  updateUser,
  updateAvatar,
  getUserById,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Заполните поле корректным URL');
      })
      .message({
        'string.required': 'Поле должны быть заполнено',
      }),
  }),
}), updateAvatar);

module.exports = router;
