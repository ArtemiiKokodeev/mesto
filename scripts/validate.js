const showInputError = (popupElement, inputElement, errorMessage, options) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (popupElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(popupElement, inputElement, options);
  }
};

const setEventListeners = (popupElement, options) => {
  const inputList = Array.from(popupElement.querySelectorAll(options.inputSelector));
  const buttonElement = popupElement.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popupElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

const enableValidation = (options) => {
  const popupList = Array.from(document.querySelectorAll(options.formSelector));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(popupElement, options);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const disabledButton = (buttonElement, options) => {
  buttonElement.classList.add(options.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, options);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

const options = {
  formSelector: '.popup__content',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
};

enableValidation(options);
