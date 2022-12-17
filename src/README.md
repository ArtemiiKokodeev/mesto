# Cайт «Mesto Russia»

## О проекте
Сайт разработан согласно методологии БЭМ и ООП с целью закрепить теоретические знания, полученные на 9 спринтах обучения веб-разработке на Яндекс.Практикум.

На сайте представлен интерфейс для добавления контента: аватар, имя, профессия, карточки с изображениями и подписями. Посредством Javascript реализовано:
1. Добавление и изменение имени и профессии
2. Добавление и изменение аватара
3. Добавление карточки с названием и изображением
4. Открытие карточки, установка лайка, удаление карточки
5. Валидация форм аватара, профиля, карточки
6. Закрытие форм по клику на overlay, Esc и крестик
7. Подключение проекта к серверу

Верстка выполнена согласно макету в Figma по [Спринту 4](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1), [Спринту 5](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1) и [Спринту 6](https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1).

Адаптивная верстка позволяет корректно открывать сайт на устройствах с разным разрешением экрана.
Добавлена валидация полей ввода данных.

## Стэк
* HTML5
* CSS
* Javascript
* REST API
* Webpack
* Git
* Figma

## Ключевые технологии/инструменты
1. Адаптивная верстка (Responsive)
2. Флексбокс-верстка
3. Grid-верстка
4. Позиционирование
5. Относительные размеры
6. Семантика тэгов в HTML
7. Псевдоклассы
8. Организация файлов (Nested)
9. Примитивы, функции, переменные
10. DOM (работа с атрибутами, манипуляции с классами CSS, события и др.)
11. Работа с формами и валидация форм
12. Применение парадигмы ООП: классы, модули, деструктуризация, слабое связывание классов, привязка this по умолчанию и методом bind, и др.)
13. Асинхронность в JS
14. API. Подключение проекта к серверу, запрос на сервер при:
    - первичной загрузке информации о профиле пользователя, аватара и карточках
    - редактировании профиля
    - добавлении и удалении карточек, установке и снятии лайков на карточке
15. Webpack:
    - сборки build и dev
    - настройка module.exports
    - установка плагинов
    - минификация и транспиляция JS-бабелем
    - обработка и минификация CSS
    - обработка изображений и шрифтов


## Автор
Артемий Кокодеев [Github](https://github.com/ArtemiiKokodeev)

Проект на [Github Pages](https://artemiikokodeev.github.io/mesto/)