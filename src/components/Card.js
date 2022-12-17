// Определение класса карточки,
// используется в index.js в функции генерации 6 карточек из стандартного массива
// и функции создания новых карточек в форме AddCard

export default class Card {
  constructor(item, userId, handleCardClick, handleDeleteCardClick, handleLikeClick, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
  };


  // Шаблон добавления карточки

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

    // Слушатели событий

  _eventListeners() {

    // Удаление карточки

      this._delete.addEventListener('click', () => {
        this._handleDeleteCardClick(this._id);
      });

      // Лайк карточки

      this._like.addEventListener('click', () => {
        this._handleLikeClick(this._id);
      });

      // Открытие картинки

      this._image.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    };


    // Обработчик клика на кнопку удаления карточки

  handleDeleteElement() {
    this._element.remove();
    this._element = null;
    };


    // Обработчик подсчета лайков карточки

  setLikes(newLikes) {
    //console.log(newLikes)
    this._likes = newLikes;
    const likeCounterElement = this._element.querySelector('.element__like-counter');
    likeCounterElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._like.classList.add('element__like-button_active');
    } else {
      this._like.classList.remove('element__like-button_active');
    }
  }


    // Проверка нажатия лайка карточки пользователем

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }


    // Скрытие корзин удаления на чужих карточках

  _hideDeleteButton() {
    if(this._userId !== this._ownerId) {
      this._delete.style.display = 'none'
    }
  }


    // Создание карточки из темплейта, наполнение контентом, добавление методов

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.element__like-button');
    this._delete = this._element.querySelector('.element__delete-button');
    this._image = this._element.querySelector('.element__image');

    this._eventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._image.alt = this._name;
    this._image.src = this._link;

    this.setLikes(this._likes);

    this._hideDeleteButton();

    return this._element;
  };
};
