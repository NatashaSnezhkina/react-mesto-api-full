import React from 'react';

function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {

  function renderLoading(){
    buttonText="Сохранение...";
    console.log(buttonText);
  }

  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__overlay popup-${name}__overlay`} onClick={onClose}></div>
      <div className="popup__content">
        <h3 className="popup__title">{title}</h3>
        <form className={`form form-${name} popup__form`} name={`popup${name}__form`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`submit-button popup-${name}__submit-button popup__button`} onClick={renderLoading}>{buttonText}</button>
        </form>
        <button className={`close-button popup-${name}__close-button`} type="button" aria-label="закрыть" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;