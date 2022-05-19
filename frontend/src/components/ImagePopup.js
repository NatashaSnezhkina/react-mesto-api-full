import React from 'react';

function ImagePopup({
  card,
  onClose
}) {
  return (
    <div className={`popup popup-picture ${card.name !== "" ? "popup_opened" : ""}`}>
      <div className="popup__overlay popup-picture__overlay" onClick={onClose}></div>
      <div className="popup-picture__content">
        <img className="popup-picture__image" src={card.link} alt={card.name} />
        <h3 className="popup-picture__description">{card.name}</h3>
        <button className="close-button popup-picture__close-button" type="button" aria-label="закрыть" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;