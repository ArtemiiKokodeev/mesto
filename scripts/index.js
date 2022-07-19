import FormValidator from './FormValidator.js';
import Card from './Card.js';

// Попап редактирования профиля

const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditProfile = document.forms.userInfoForm;
const formEditProfileOpenButton = document.querySelector('.profile__edit-button');
const formEditProfileCloseButton = document.querySelector('.popup__close');
const nameInput = userInfoForm.elements.userName;
const occupationInput = userInfoForm.elements.userOccupation;
const nameText = document.querySelector('.profile__name');
const occupationText = document.querySelector('.profile__occupation');

// Попап добавления карточки

const popupAddCard = document.querySelector('.popup_add-card');
const formAddCard = document.forms.addCardForm;
const formAddCardOpenButton = document.querySelector('.profile__add-button');
const formAddCardCloseButton = document.querySelector('.popup__close_add-card');
const placeNameInput = addCardForm.elements.placeName;
const imageLinkInput = addCardForm.elements.imageLink;

// Попап открытия карточки

const popupOpenCard = document.querySelector('.popup_open-card');
const imageOpenCard = document.querySelector('.popup__image');
const placeNameOpenCard = document.querySelector('.popup__place-name');
const closeButtonOpenCard = document.querySelector('.popup__close_open-card');

// DOM элемент списка для добавления карточек

const elementsListContainer = document.querySelector('.elements__list');

// Исходный массив карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Объект настроек с селекторами и классами формы для валидации

const popupClassObject = {
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
};

  // Универсальная функция открытия попапа

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscClose);
  element.addEventListener('click', popupOverlayClickHandler);
}

  // Универсальные функции закрытия попапа

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscClose);
  element.removeEventListener('click', popupOverlayClickHandler);
};

function handleEscClose (evt) {
  if (evt.key === 'Escape') {
    const popupIsActive = document.querySelector(('.popup_opened'));
    closePopup(popupIsActive);
  };
};

function popupOverlayClickHandler (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};

  // Функция открытия попапа EditProfile

function openEditProfileForm() {
  nameInput.value = nameText.textContent;
  occupationInput.value = occupationText.textContent;
  formEditProfileValidator.resetValidation();
  openPopup(popupEditProfile);
};

  // Функция получения данных и добавления в профиль EditProfile

function submitEditProfileForm (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  occupationText.textContent = occupationInput.value;

  closePopup(popupEditProfile);
};

// Функция открытия попапа AddCard

function openAddCardForm() {
  formAddCard.reset();
  formAddCardValidator.resetValidation();
  openPopup(popupAddCard);
};

  // Получение из формы данных карточки AddCard и добавление в массив

function submitAddCardForm (evt) {
  evt.preventDefault();
  renderCard(elementsListContainer, createCard(placeNameInput.value, imageLinkInput.value, '.elements-template', openPopupOpenCard));
  closePopup(popupAddCard);
  formAddCard.reset();
};

  // Открытие попапа OpenCard

function openPopupOpenCard(name, link) {
  placeNameOpenCard.textContent = name;
  imageOpenCard.src = link;
  imageOpenCard.alt = name;

  openPopup(popupOpenCard);
};


// Функция создания карточки

function createCard (name, link, template, openImageFunction) {
  const card = (new Card(name, link, template, openImageFunction).generateCard());
  return card;
};

// Функция добавления карточки в разметку

function renderCard (container, cardItem) {
  container.prepend(cardItem);
};


// Создание экземпляра класса (карточки)

initialCards.forEach((cardsData) => {
  renderCard(elementsListContainer, createCard(cardsData.name, cardsData.link, '.elements-template', openPopupOpenCard));
});


// Валидация форм

const formEditProfileValidator = new FormValidator(popupClassObject, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(popupClassObject, formAddCard);
formAddCardValidator.enableValidation();


  // Слушатель открытия попапа EditProfile
formEditProfileOpenButton.addEventListener('click', openEditProfileForm);

  // Слушатель и функция закрытия попапа EditProfile
formEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

  // Слушатель сабмита данных и добавления в профиль EditProfile
formEditProfile.addEventListener('submit', submitEditProfileForm);

  // Слушатель и функция открытия попапа AddCard
formAddCardOpenButton.addEventListener('click', openAddCardForm);

    // Слушатель и функция закрытия попапа AddCard
formAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));

    //  Слушатель сабмита данных и добавления карточки AddCard
formAddCard.addEventListener('submit', submitAddCardForm);

  // Слушатель и функция закрытия попапа OpenCard
closeButtonOpenCard.addEventListener('click', () => closePopup(popupOpenCard));
