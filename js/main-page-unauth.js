const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Переменные
const recipeList = Array.from(document.querySelectorAll('.button'));

// Добавляет слушатель на кнопки добаления в покупки
function setEventListeners(element, event, handler) {
  element.forEach(item => {
    item.addEventListener(event, handler);
  })
}

// Вызов функций
setEventListeners(recipeList, 'click', addRecipeHandler);