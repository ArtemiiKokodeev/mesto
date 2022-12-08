// Класс отвечает за отрисовку элементов (карточек) на странице

// Первым параметром конструктора принимает объект.
// Свойство items — это массив данных,
// которые нужно добавить на страницу при инициализации класса.
// Свойство renderer — это функция,
// которая отвечает за создание и отрисовку данных на странице.

// Второй параметр конструктора — селектор контейнера,
// в который нужно добавлять созданные элементы.


export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
  }


  // Содержит публичный метод, который отвечает
  // за отрисовку всех элементов. Отрисовка каждого отдельного элемента
  // должна осуществляться функцией renderer.

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
      //console.log(item)
    });
  };


  // Содержит публичный метод addItem,
  // который принимает DOM-элемент и добавляет его в контейнер.

  addItem(element) {
    this._container.prepend(element);
  };
};
