// Класс наследует от Popup, форма подтверждения удаления карточки
import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
	constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__content');
  }

  // Перезаписывает родительский метод setEventListeners.
  // Метод setEventListeners класса PopupWithForm должен не только
  // добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  // Записывает в this card функцию сабмита

  changeSubmitHandler(newSubmitHadler) {
    this._handleFormSubmit = newSubmitHadler;
  }

}
