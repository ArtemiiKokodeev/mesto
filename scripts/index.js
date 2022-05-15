// Форма редактирования профиля

const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__content');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__text_type_name');
let occupationInput = document.querySelector('.popup__text_type_occupation');
let nameText = document.querySelector('.profile__name');
let occupationText = document.querySelector('.profile__occupation');

function popupEditProfileOpenToggle() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = nameText.textContent;
    occupationInput.value = occupationText.textContent;
  };
};

popupOpenButton.addEventListener('click', popupEditProfileOpenToggle);

popupCloseButton.addEventListener('click', popupEditProfileOpenToggle);

function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  occupationText.textContent = occupationInput.value;
  popupEditProfileOpenToggle()
}

popupForm.addEventListener('submit', editProfileFormSubmitHandler);

// Форма добавления карточки

const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardForm = document.querySelector('.popup__content_add-card');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = document.querySelector('.popup__close_add-card');

let placeNameInput = document.querySelector('.popup__text_type_place-name');
let imageLinkInput = document.querySelector('.popup__text_type_image-link');

function popupAddCardOpenToggle() {
  popupAddCard.classList.toggle('popup_opened');
};

popupAddCardOpenButton.addEventListener('click', popupAddCardOpenToggle);

popupAddCardCloseButton.addEventListener('click', popupAddCardOpenToggle);

function cadrFormSubmitHandler (evt) {
  evt.preventDefault();
  renderCard({ name: placeNameInput.value, link: imageLinkInput.value });

  placeNameInput.value = '';
  imageLinkInput.value = '';

  popupAddCardOpenToggle();
};

popupAddCardForm.addEventListener('submit', cadrFormSubmitHandler);

// Добавление карточек из массива

  // Массив

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

const elementTemplate = document.querySelector('#elements-template').content.querySelector('.element');

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

    // Открытие карточки

  const popupOpenCard = document.querySelector('.popup_open-card');
  const popupOpenCardImage = document.querySelector('.popup__image');
  const popupOpenCardPlaceName = document.querySelector('.popup__place-name');

  function popupOpenCardToggle() {
    popupOpenCard.classList.toggle('popup_opened');
    if (popupOpenCard.classList.contains('popup_opened')) {
      popupOpenCardPlaceName.textContent = cardsData.name;
      popupOpenCardImage.src = cardsData.link;
      popupOpenCardImage.alt = cardsData.name;
    };
  };

  cardLink.addEventListener('click', popupOpenCardToggle);

  return elementCard;
}

const renderCard = (cardsData) => {
  elementsListContainer.prepend(generateCard(cardsData));
};

initialCards.forEach((cardsData) => {
  renderCard(cardsData);
});

// Закрытие карточки

const popupOpenCard = document.querySelector('.popup_open-card');
const popupOpenCardCloseButton = document.querySelector('.popup__close_open-card');

const popupOpenCardClose = () => {
  popupOpenCard.classList.remove('popup_opened');
};

popupOpenCardCloseButton.addEventListener('click', popupOpenCardClose);


