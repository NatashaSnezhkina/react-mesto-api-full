import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  onClose,
  isOpen,
  onAddPlace,
}) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen])

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

      <input className="field field_type_title popup__input" id="popup-add__input_title"
        type="text" name="name" placeholder="Название" required minLength="2" maxLength="30" value={name || ''} onChange={handleChangeName} />
      <span id="popup-add__input_title-error" className="error"></span>
      <input className="field field_type_link popup__input" id="popup-add__input_link"
        type="url" name="link" placeholder="Ссылка на картинку" required value={link || ''} onChange={handleChangeLink} />
      <span id="popup-add__input_link-error" className="error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;