// Попап редактирования профиля

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditProfile = document.querySelector('.popup__content');
const formEditProfileOpenButton = document.querySelector('.profile__edit-button');
const formEditProfileCloseButton = document.querySelector('.popup__close');

const nameInput = document.querySelector('.popup__text_type_name');
const occupationInput = document.querySelector('.popup__text_type_occupation');
const nameText = document.querySelector('.profile__name');
const occupationText = document.querySelector('.profile__occupation');

  // Универсальные функции открытия и закрытия попапа

function openPopup(element) {
  element.classList.add('popup_opened');
};

function closePopup(element) {
  element.classList.remove('popup_opened');
};

  // Открытие попапа EditProfile

function openEditProfileForm() {
  nameInput.value = nameText.textContent;
  occupationInput.value = occupationText.textContent;

  openPopup(popupEditProfile);
};

formEditProfileOpenButton.addEventListener('click', openEditProfileForm);

  // Закрытие попапа EditProfile

formEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

  // Получение данных и добавление в профиль

function submitEditProfileForm (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  occupationText.textContent = occupationInput.value;

  closePopup(popupEditProfile);
};

formEditProfile.addEventListener('submit', submitEditProfileForm);



// Попап добавления карточки

const popupAddCard = document.querySelector('.popup_add-card');
const formAddCard = document.querySelector('.popup__content_add-card');
const formAddCardOpenButton = document.querySelector('.profile__add-button');
const formAddCardCloseButton = document.querySelector('.popup__close_add-card');

const placeNameInput = document.querySelector('.popup__text_type_place-name');
const imageLinkInput = document.querySelector('.popup__text_type_image-link');

  // Открытие попапа AddCard

formAddCardOpenButton.addEventListener('click', () => openPopup(popupAddCard));

  // Закрытие попапа AddCard

formAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));

  // Получение данных карточки и добавление в массив

function submitAddCardForm (evt) {
  evt.preventDefault();
  renderCard({ name: placeNameInput.value, link: imageLinkInput.value });

  formAddCard.reset();

  closePopup(popupAddCard);
};

formAddCard.addEventListener('submit', submitAddCardForm);



// Попап открытия карточки

const popupOpenCard = document.querySelector('.popup_open-card');
const imageOpenCard = document.querySelector('.popup__image');
const placeNameOpenCard = document.querySelector('.popup__place-name');
const closeButtonOpenCard = document.querySelector('.popup__close_open-card');

  // Открытие попапа OpenCard

function openPopupOpenCard(cardsData) {
  placeNameOpenCard.textContent = cardsData.name;
  imageOpenCard.src = cardsData.link;
  imageOpenCard.alt = cardsData.name;

  openPopup(popupOpenCard);
};

  // Закрытие попапа OpenCard

closeButtonOpenCard.addEventListener('click', () => closePopup(popupOpenCard));



// Инструкция по добавлению карточек из массива

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

  // Шаблон добавления карточки

const elementTemplate = document.querySelector('#elements-template')
.content.querySelector('.element');

  // DOM элементы

const elementsListContainer = document.querySelector('.elements__list');

  // Обработчик клика на кнопку удаления карточки

const handleDeleteElement = (evt) => {
  evt.target.closest('.element').remove();
};

  // Обработчик клика на кнопку лайка карточки

const handleLikeElement = (evt) => {
  evt.target.classList.toggle('element__like-button_active');
};

  // Геренация карточки

const generateCard = (cardsData) => {

  const elementCard = elementTemplate.cloneNode(true);

  const cardTitle = elementCard.querySelector('.element__title');
  const cardLink = elementCard.querySelector('.element__image');

  cardTitle.textContent = cardsData.name;
  cardLink.src = cardsData.link;
  cardLink.alt = cardsData.name;

    // Кнопка удаления карточки

  const deleteButton = elementCard.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', handleDeleteElement);

    // Кнопка лайка карточки

  const likeButton = elementCard.querySelector('.element__like-button');
  likeButton.addEventListener('click', handleLikeElement);

    // Обработчик открытия картинки у карточки

  cardLink.addEventListener('click', () => openPopupOpenCard(cardsData));

  return elementCard;
}

const renderCard = (cardsData) => {
  elementsListContainer.prepend(generateCard(cardsData));
};

initialCards.forEach((cardsData) => {
  renderCard(cardsData);
});
