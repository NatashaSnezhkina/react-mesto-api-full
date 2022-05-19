import React from 'react';

function Card({
  card,
  onCardClick,
  currentUser,
  onCardLike,
  onCardDelete
}) {

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  return (
    <div className="element">
      <img className="element__photo" src={card.link} alt={card.name}
        onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button className={`element__like ${isLiked ? 'element__like_active' : ''}`} type="button" aria-label="лайк" onClick={handleLikeClick}></button>
          <p className="element__like__counter">{card.likes.length}</p>
        </div>
      </div>
      <button className={` ${isOwn ? 'element__basket' : 'button'}`} type="button" aria-label="корзина" onClick={handleDeleteClick}></button>
    </div>
  )
}

export default Card;