import { openPopupOpenCard } from './index.js';

export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
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
        this._handleDeleteElement();
      });

      // Лайк карточки

      this._like.addEventListener('click', () => {
        this._handleLikeElement();
      });

      // Открытие картинки

      this._image.addEventListener('click', () => {
        this._handleOpenImage();
      });
    };


    // Обработчик клика на кнопку удаления карточки

  _handleDeleteElement() {
    this._element.closest('.element').remove();
    };

      // Обработчик клика на кнопку лайка карточки

  _handleLikeElement() {
    this._like.classList.toggle('element__like-button_active');
    };

      // Обработчик клика на картинку

  _handleOpenImage() {
    openPopupOpenCard(this._name, this._link);
  }


    // Геренация карточки

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.element__like-button');
    this._delete = this._element.querySelector('.element__delete-button');
    this._image = this._element.querySelector('.element__image');

    this._eventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;
  };
};
