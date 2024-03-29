// Попап редактирования профиля
export const formEditProfile = document.forms.userInfoForm;
export const formEditProfileOpenButton = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('.popup__text_type_name');
export const occupationInput = document.querySelector('.popup__text_type_occupation');

// Попап добавления карточки
export const formAddCard = document.forms.addCardForm;
export const formAddCardOpenButton = document.querySelector('.profile__add-button');

// Попап подтверждения удаления карточки
export const formEditAvatar = document.forms.editAvatarForm;
export const formEditAvatarOpenButton = document.querySelector('.profile__avatar-container');
export const avatarInput = document.querySelector('.popup__text_type_image-link');


// Объект настроек с селекторами и классами формы для валидации
export const popupClassObject = {
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
};

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-55/',
  headers: {
    'Content-type': 'application/json',
    authorization: '59fe9cd6-0f57-4ebd-bbbd-39bb16004429'
  }
}

// Исходный массив карточек
// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];
