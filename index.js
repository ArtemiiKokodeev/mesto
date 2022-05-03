const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');

let nameInput = document.querySelector('.popup__text_type_name');
let occupationInput = document.querySelector('.popup__text_type_occupation');
let nameText = document.querySelector('.profile__name');
let occupationText = document.querySelector('.profile__occupation');

const popupCloseButton = document.querySelector('.popup__close');
const popupSubmitButton = document.querySelector('.popup__submit');

function popupOpenToggle() {
  popup.classList.toggle('popup_opened');
  nameInput.value = nameText.textContent;
  occupationInput.value = occupationText.textContent;
}

popupOpenButton.addEventListener('click', popupOpenToggle);

popupCloseButton.addEventListener('click', popupOpenToggle);

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  occupationText.textContent = occupationInput.value;
  popupOpenToggle()
}

popupSubmitButton.addEventListener('click', formSubmitHandler);
