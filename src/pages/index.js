import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';

import {
  formEditProfile,
  formEditProfileOpenButton,
  nameInput,
  occupationInput,
  formAddCard,
  formAddCardOpenButton,
  popupClassObject,
  apiConfig,
  formEditAvatar,
  formEditAvatarOpenButton
} from '../utils/constants.js';


// API

const apiNew = new Api(apiConfig);
//console.log(apiNew)

let userId

// Запрос к API на сервер для загрузки инфо профиля и исходных карточек
// при обновлении страницы

Promise.all([apiNew.getInitialCards(), apiNew.getProfileInfo()])
  .then(([initCards, initUserInfo]) => {
    //console.log(initCards)
    //console.log(initUserInfo)

    userId = initUserInfo._id;
    //console.log(userId)

    userInformation.setUserInfo({
      userName: initUserInfo.name,
      userOccupation: initUserInfo.about,
      avatarLink: initUserInfo.avatar
    });

    //console.log(initUserInfo.avatar)

    cardRenderer.renderItems(initCards)
    })
  .catch((error) => {
    console.log(`Ошибка при первичной загрузке карточек: ${error}`)
  })



// Создание экземпляра класса UserInfo (управление отображением
// информации о пользователе)

const userInformation = new UserInfo({
  nameSelector: '.profile__name',
  occupationSelector: '.profile__occupation',
  avatarSelector: '.profile__avatar'
})

// Создание экземпляра класса попапа PopupWithForm
// при открытии формы редактирования профиля EditProfile,
// с запросом к API на сервер для загрузки обновленной инфо профиля

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  submitText: 'Сохранить',
  handleFormSubmit: ({userName, userOccupation}) => {

    popupEditProfile.renderLoading(true);

    apiNew.editProfileInfo({userName, userOccupation})
    .then(() => {
      userInformation.setUserInfo({userName, userOccupation});
      popupEditProfile.close();
    })
    .catch((error) => {
      console.log(`Ошибка при изменении профиля: ${error}`)
    })
    .finally(() => popupEditProfile.renderLoading(false))

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



// Создание экземпляра класса попапа PopupWithForm
// при открытии формы изменения аватара профиля,
// с запросом к API на сервер для загрузки обновленного аватара

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  submitText: 'Сохранить',
  handleFormSubmit: ({avatarLink}) => {

    popupEditAvatar.renderLoading(true);

    apiNew.editAvatar({avatarLink})
    .then(() => {
      userInformation.setUserInfo({avatarLink});
      //console.log(avatarLink)
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log(`Ошибка при изменении аватара: ${error}`)
    })
    .finally(() => popupEditAvatar.renderLoading(false))

  }
})

popupEditAvatar.setEventListeners();

// Слушатель открытия попапа EditAvatar

formEditAvatarOpenButton.addEventListener('click', () => {
  formEditAvatarValidator.resetValidation();
  popupEditAvatar.open();
});




// Создание экземпляра класса попапа PopupWithForm
// при открытии формы добавления новой карточки AddCard
// с запросом к API на сервер для загрузки новой карточки

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_add-card',
  submitText: 'Создать',
  handleFormSubmit: (item) => {

    popupAddNewCard.renderLoading(true);

    //console.log(item)
    apiNew.addNewCard(item.name, item.link)
    .then((newCard) => {
      cardRenderer.addItem(createCard(newCard));
      popupAddNewCard.close();
    })
    .catch((error) => {
      console.log(`Ошибка при добавлении карточки: ${error}`)
    })
    .finally(() => popupAddNewCard.renderLoading(false))

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
    cardRenderer.addItemToTheEnd(createCard(item))
    }
  },
  '.elements__list'
);


// Генерация и возврат готовой карточки

function createCard(item) {
  const card = new Card(
    item,
    userId,
    handleCardClick,
    (id) => {
      popupDeleteConfirmation.open();
      popupDeleteConfirmation.changeSubmitHandler(() => {
        apiNew.deleteCard(id)
        .then(res => {
          card.handleDeleteElement();
          popupDeleteConfirmation.close();
        })
        .catch((error) => {
          console.log(`Ошибка при удалении карточки: ${error}`)
        })
      })
    },
    (id) => {
      if(card.isLiked()) {
        apiNew.removeCardLike(id)
        .then((res) => {
          //console.log(res)
          card.setLikes(res.likes)
        })
      } else {
        apiNew.addCardLike(id)
        .then((res) => {
          //console.log(res)
          card.setLikes(res.likes)
        })
      }
    },
    '.elements-template')
  const cardElement = card.generateCard();
  return cardElement
}


// Создание экземпляра класса попапа при открытии карточки

const popupOpenCardWithImage = new PopupWithImage('.popup_open-card');
popupOpenCardWithImage.setEventListeners();


// Функция открытия карточки с методом open класса PopupWithImage

function handleCardClick (name, link) {
  popupOpenCardWithImage.open(name, link)}


// Создание экземпляра класса попапа подтверждения удаления карточки

const popupDeleteConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_delete-card',
  handleFormSubmit: () => {}
});
popupDeleteConfirmation.setEventListeners();



// Валидация форм

const formEditProfileValidator = new FormValidator(popupClassObject, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(popupClassObject, formAddCard);
formAddCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(popupClassObject, formEditAvatar);
formEditAvatarValidator.enableValidation();
