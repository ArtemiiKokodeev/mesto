// Класс UserInfo отвечает за управление отображением
// информации о пользователе на странице

// Принимает в конструктор объект с селекторами двух элементов:
// элемента имени пользователя и элемента информации о себе.

export default class UserInfo {
	constructor({nameSelector, occupationSelector}) {
    this._nameSelector = nameSelector;
    this._occupationSelector = occupationSelector;
    this._name = document.querySelector(this._nameSelector);
    this._occupation = document.querySelector(this._occupationSelector);
  }

  // Содержит публичный метод getUserInfo, который возвращает объект
  // с данными пользователя. Этот метод пригодится когда данные
  // пользователя нужно будет подставить в форму при открытии.

  getUserInfo() {
    const info = {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    };
    //console.log('getUserInfo', info);
    return info;
  }

  // Содержит публичный метод setUserInfo, который принимает
  // новые данные пользователя и добавляет их на страницу.

  setUserInfo(values) {
    console.log('setUserInfo', values)
    this._name.textContent = values.userName;
    this._occupation.textContent = values.userOccupation;
  }
}

