// Определение класса валидатора,
// используется в index.js при создании экземпляров для двух форм - EditProfile и AddCard

export default class FormValidator {
  constructor(popupClassObject, formElement) {
    this._popupClassObject = popupClassObject;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._popupClassObject.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._popupClassObject.submitButtonSelector);
  };

  // Приватная функция показа ошибок при валидации инпутов

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._popupClassObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._popupClassObject.errorClass);
  };

  // Приватная функция очистки ошибок при валидации инпутов

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._popupClassObject.inputErrorClass);
    errorElement.classList.remove(this._popupClassObject.errorClass);
    errorElement.textContent = '';
  };

  // Приватная функция проверки валидности инпутов и показа/очистки ошибок

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Приватная функция старта валидации форм,
  // используется в публичном методе enableValidation

  _setEventListeners() {

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };


  // Публичная функция старта валидации форм,
  // вызываем в index.js у экземпляров класса FormValidator
  // для двух форм - EditProfile и AddCard

  enableValidation() {
      this._setEventListeners();
  };

  // Публичная функция очистки подсказок об ошибках при открытии попапа,
  // вызываем в index.js в функциях открытия попапов EditProfile и AddCard

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

  }

  // Приватная функция поиска хотя бы одной ошибки валидации инпутов,
  // возвращает значение true/false

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Приватная функция переключения в неактивное состояние кнопки сабмита при добавления новой карточки

  _disabledButton() {
    this._buttonElement.classList.add(this._popupClassObject.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  // Приватная функция проверки валидности инпутов
  // и переключения в активное/неактивное состояние кнопки сабмита при добавления новой карточки

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledButton();
    } else {
      this._buttonElement.classList.remove(this._popupClassObject.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    };
  };
};
