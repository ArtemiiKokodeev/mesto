// Класс UserInfo отвечает за управление отображением
// информации о пользователе на странице

// Принимает в конструктор объект с селекторами двух элементов:
// элемента имени пользователя и элемента информации о себе.

export default class UserInfo {
	constructor({nameSelector, occupationSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._occupationSelector = occupationSelector;
    this._avatarSelector = avatarSelector;
    this._name = document.querySelector(this._nameSelector);
    this._occupation = document.querySelector(this._occupationSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }

  // Содержит публичный метод getUserInfo, который возвращает объект
  // с данными пользователя. Этот метод пригодится когда данные
  // пользователя нужно будет подставить в форму при открытии.

  getUserInfo() {
    const info = {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
      avatar: this._avatar.src
    };
    return info;
  }

  // Содержит публичный метод setUserInfo, который принимает
  // новые данные пользователя и добавляет их на страницу.

  setUserInfo({userName, userOccupation, avatarLink}) {
    //console.log(userName, userOccupation, avatarLink)
    if (userName) this._name.textContent = userName;
    if (userOccupation) this._occupation.textContent = userOccupation;
    if (avatarLink) this._avatar.src = avatarLink;
    //console.log(this._avatar.src)
  }
}

