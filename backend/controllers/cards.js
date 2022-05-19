const Card = require('../models/card');
const NotFoundError = require('../errors/404-error');
const IncorrectDataError = require('../errors/400-error');
const ForbiddenError = require('../errors/403-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      likes: card.likes,
      _id: card._id,
      createdAt: card.createdAt,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные при создании карточки'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (userId !== card.owner.toString()) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }

      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => {
          res.send({
            name: deletedCard.name,
            link: deletedCard.link,
            owner: deletedCard.owner,
            likes: deletedCard.likes,
            _id: deletedCard._id,
            createdAt: deletedCard.createdAt,
          });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные при удалении карточки'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id
    { new: true }, // обновленный объект
  )
    .then((card) => {
      if (card) {
        res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          likes: card.likes,
          _id: card._id,
          createdAt: card.createdAt,
        });
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные при постановке лайка'));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          likes: card.likes,
          _id: card._id,
          createdAt: card.createdAt,
        });
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные при постановке лайка'));
      }
      next(err);
    });
};
