import PopupWithForm from "./PopupWithForm";
import React, { useState } from "react";

function ConfirmPopup({
  onClose,
  isOpen,
  onSubmit,
  card
}) {

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText="Да"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      >
    </PopupWithForm>)
}

export default ConfirmPopup;