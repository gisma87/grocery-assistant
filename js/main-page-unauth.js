const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Переменные
const recipeList = Array.from(document.querySelectorAll('.button'));
const buttonStarList = Array.from(document.querySelectorAll('.button-star'));

// Добавляет слушатель на все кнопки
function setEventListeners(element, event, handler) {
  element.forEach(item => {
    item.addEventListener(event, handler);
  })
}

// Вызов функций
setEventListeners(recipeList, 'click', addRecipeHandler);