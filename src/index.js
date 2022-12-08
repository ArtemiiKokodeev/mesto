import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import './styles/index.css';


// Попап редактирования профиля
const formEditProfile = document.forms.userInfoForm;
const formEditProfileOpenButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__text_type_name');
const occupationInput = document.querySelector('.popup__text_type_occupation');

// Попап добавления карточки
const formAddCard = document.forms.addCardForm;
const formAddCardOpenButton = document.querySelector('.profile__add-button');

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

// Создание экземпляра класса попапа при открытии карточки

const popupOpenCardWithImage = new PopupWithImage('.popup_open-card');

popupOpenCardWithImage.setEventListeners();


// Функция открытия карточки с методом open класса PopupWithImage

function handleCardClick (name, link) {
  popupOpenCardWithImage.open(name, link)}


// Создание экземпляра класса попапа PopupWithForm
// при открытии формы добавления новой карточки AddCard

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_add-card',
  handleFormSubmit: (formData) => {
    const addNewCard = new Section({
      items: [{
        name: formData.placeName,
        link: formData.imageLink
      }],
      renderer: (cardData) => {
        const card = new Card(
          cardData.name,
          cardData.link,
          '.elements-template',
          handleCardClick);
        const cardElement = card.generateCard();
        addNewCard.addItem(cardElement);
      },
    },
    '.elements__list');

    addNewCard.renderItems();
    popupAddNewCard.close();
  }
});

popupAddNewCard.setEventListeners();


// Слушатель открытия попапа AddCard

formAddCardOpenButton.addEventListener('click', () => {
  formAddCard.reset();
  formAddCardValidator.resetValidation();
  popupAddNewCard.open();
  //popupAddNewCard.setEventListeners();
});


// Создание экземпляра класса UserInfo (управление отображением
// информации о пользователе)

const userInformation = new UserInfo({
  nameSelector: '.profile__name',
  occupationSelector: '.profile__occupation'
})


// Слушатель открытия попапа EditProfile

formEditProfileOpenButton.addEventListener('click', () => {
  const profileFormValues = userInformation.getUserInfo();
  //console.log(profileFormValues);
  nameInput.value = profileFormValues.name;
  occupationInput.value = profileFormValues.occupation;
  //console.log(nameInput.value);
  //console.log(occupationInput.value);

  formEditProfileValidator.resetValidation();
  popupEditProfile.open();
});


// Создание экземпляра класса попапа PopupWithForm
// при открытии формы редактирования профиля EditProfile

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: (values) => {
    userInformation.setUserInfo(values);
    popupEditProfile.close();
  }
});

popupEditProfile.setEventListeners();


// Создание экземпляра класса Section
// (отрисовка карточек на странице)

const cardsList = new Section({
  items: initialCards,
  renderer: (cardData) => {
      const card = new Card(
        cardData.name,
        cardData.link,
        '.elements-template',
        handleCardClick);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  '.elements__list'
);

cardsList.renderItems();


// Валидация форм

const formEditProfileValidator = new FormValidator(popupClassObject, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(popupClassObject, formAddCard);
formAddCardValidator.enableValidation();
