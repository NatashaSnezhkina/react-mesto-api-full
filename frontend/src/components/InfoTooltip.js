import React from 'react';
import success from '../images/Success.png';
import error from '../images/Error.png';

function InfoTooltip({
  isOpen,
  onClose,
  isSuccess
}) {
  return (
    <div className={`popup popup-info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__overlay popup-info__overlay" onClick={onClose}></div>
      <div className="popup-info__content popup__content">
        {isSuccess ? (
          <>
            <img className="popup-info__image" src={success} alt="popup-info" />
            <h3 className="popup-info__description">Вы успешно зарегистрировались!</h3>
          </>)
          : (
            <>
              <img className="popup-info__image" src={error} />
              <h3 className="popup-info__description">Что-то пошло не так! Попробуйте ещё раз.</h3>
            </>)}
        <button className="close-button popup-info__close-button" type="button" aria-label="закрыть" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;

