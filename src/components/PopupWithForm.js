// Класс наследует от Popup, кроме селектора попапа принимает в конструктор колбэк сабмита формы
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor({popupSelector, submitText, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__content');
    this._submitButton = this._form.querySelector('.popup__submit');
    //console.log(this._submitButton);
    this._submitText = submitText;
    //console.log(this._submitText);
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__text'));
    //console.log(this._inputList);
  }

  // Содержит приватный метод _getInputValues,
  // который собирает данные всех полей формы.

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    });
    //console.log('getInpitValues', this._formValues);
    return this._formValues;
  }


  // Перезаписывает родительский метод setEventListeners.
  // Метод setEventListeners класса PopupWithForm должен не только
  // добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Метод уведомления пользователя о процессе загрузки данных на сервер

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitText;
    }
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа
  // форма должна ещё и сбрасываться.

  close() {
    //console.log('overloaded close')
    super.close();
    this._form.reset();
  }

}

