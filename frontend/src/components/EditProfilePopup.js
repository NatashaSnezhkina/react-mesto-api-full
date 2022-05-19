import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser
}) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
      avatar: currentUser.avatar
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

      <input className="field field_type_name popup__input"
        type="text" name="name" id="popup-${name}__input_name" placeholder="Имя" required minLength="2" maxLength="40"
        value={name || ''} onChange={handleChangeName} />
      <span id="popup-edit__input_name-error" className="error"></span>
      <input className="field field_type_description popup__input" type="text" id="popup-edit__input_description" name="about"
        placeholder="Описание" required minLength="2" maxLength="200"
        value={description || ''} onChange={handleChangeDescription} />
      <span id="popup-edit__input_description-error" className="error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;