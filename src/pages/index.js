import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

import {
  formEditProfile,
  formEditProfileOpenButton,
  nameInput,
  occupationInput,
  formAddCard,
  formAddCardOpenButton,
  initialCards,
  popupClassObject
} from '../utils/constants.js';


// Создание экземпляра класса UserInfo (управление отображением
// информации о пользователе)

const userInformation = new UserInfo({
  nameSelector: '.profile__name',
  occupationSelector: '.profile__occupation'
})



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


// Слушатель открытия попапа EditProfile

formEditProfileOpenButton.addEventListener('click', () => {
  const profileFormValues = userInformation.getUserInfo();
  //console.log(profileFormValues);
  nameInput.value = profileFormValues.name;
  occupationInput.value = profileFormValues.occupation;

  formEditProfileValidator.resetValidation();
  popupEditProfile.open();
});



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
  handleFormSubmit: (item) => {
    cardRenderer.addItem(createCard(item));
    popupAddNewCard.close();
    }
  })

  popupAddNewCard.setEventListeners();


  // Слушатель открытия попапа AddCard

  formAddCardOpenButton.addEventListener('click', () => {
    formAddCard.reset();
    formAddCardValidator.resetValidation();
    popupAddNewCard.open();
  });



// Создание экземпляра класса Section
// (отрисовка карточек на странице)

const cardRenderer = new Section({
  renderer: (item) => {
    cardRenderer.addItem(createCard(item))
    }
  },
  '.elements__list'
);

cardRenderer.renderItems(initialCards);



// Генерация и возврат готовой карточки

function createCard(item) {
  const card = new Card(
    item.name,
    item.link,
    '.elements-template',
    handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}



// Валидация форм

const formEditProfileValidator = new FormValidator(popupClassObject, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(popupClassObject, formAddCard);
formAddCardValidator.enableValidation();
