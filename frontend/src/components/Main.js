import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
        </div>
        <div className="profile__info">
          <div className="profile__main-info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="edit-button" type="button" aria-label="редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="add-button" type="button" aria-label="добавить" onClick={onAddPlace}></button>
      </section>
      <section className="elements">

        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              currentUser={currentUser}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })
        }</section>
    </main>
  )
}

export default Main;
