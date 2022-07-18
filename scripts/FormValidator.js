export default class FormValidator {
  constructor(popupClassObject, popupElement) {
    this._popupClassObject = popupClassObject;
    this._popupElement = popupElement;

    this._inputList = Array.from(this._popupElement.querySelectorAll(this._popupClassObject.inputSelector));
    this._buttonElement = this._popupElement.querySelector(this._popupClassObject.submitButtonSelector);
  };


  _showInputError(inputElement, errorMessage) {
    const errorElement = this._popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._popupClassObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._popupClassObject.errorClass);
  };

  hideInputError(inputElement) {
    const errorElement = this._popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._popupClassObject.inputErrorClass);
    errorElement.classList.remove(this._popupClassObject.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  };

  _setEventListeners() {

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    const popupList = Array.from(document.querySelectorAll(this._popupClassObject.formSelector));
    popupList.forEach((popupElement) => {
      popupElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners();
    });
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  disabledButton() {
    this._buttonElement.classList.add(this._popupClassObject.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disabledButton();
    } else {
      this._buttonElement.classList.remove(this._popupClassObject.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    };
  };
};
