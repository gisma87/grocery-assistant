const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Переменные
const buttonAuthor = Array.from(document.querySelectorAll('.button_color_grey'));

// Устанавливает слешатель на все кнопки
function setListenersButton(element, event, handler) {
  element.forEach(item => {
    item.addEventListener(event, handler);
  })
}

// Вызов функций
setListenersButton(buttonAuthor, 'click', removeSubscribtionHandler);