// Класс наследует от Popup

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popup.querySelector('.popup__place-name');
    this._image = this._popup.querySelector('.popup__image');
	}

  open(name, link) {
    super.open();

    this._name.textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}
