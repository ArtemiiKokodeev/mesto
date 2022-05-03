const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__content');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__text_type_name');
let occupationInput = document.querySelector('.popup__text_type_occupation');
let nameText = document.querySelector('.profile__name');
let occupationText = document.querySelector('.profile__occupation');

function popupOpenToggle() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened'))
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

popupForm.addEventListener('submit', formSubmitHandler);
