const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Переменные
const buttonRemove = Array.from(document.querySelectorAll('.card-shopping__remove'));

// Устанавливает слешатель на все кнопки
function setListenersButton(element, event, handler) {
  element.forEach(item => {
    item.addEventListener(event, handler);
  })
}

// Вызов функций
setListenersButton(buttonRemove, 'click', removeShoppingHandler);