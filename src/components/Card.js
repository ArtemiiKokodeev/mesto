// Определение класса карточки,
// используется в index.js в функции генерации 6 карточек из стандартного массива
// и функции создания новых карточек в форме AddCard

export default class Card {
  constructor(name, link, cardSelector, openPopup) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = openPopup;
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
        this._handleDeleteElement();
      });

      // Лайк карточки

      this._like.addEventListener('click', () => {
        this._handleLikeElement();
      });

      // Открытие картинки

      this._image.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    };


    // Обработчик клика на кнопку удаления карточки

  _handleDeleteElement() {
    this._element.remove();
    this._element = null;
    };

      // Обработчик клика на кнопку лайка карточки

  _handleLikeElement() {
    this._like.classList.toggle('element__like-button_active');
    };

      // Обработчик клика на картинку

//   _handleOpenImage() {
//    this._handleCardClick(this._name, this._link);
//  }


    // Геренация карточки

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.element__like-button');
    this._delete = this._element.querySelector('.element__delete-button');
    this._image = this._element.querySelector('.element__image');

    this._eventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._image.alt = this._name;
    this._image.src = this._link;

    return this._element;
  };
};
