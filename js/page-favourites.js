const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Переменные
const recipeList = Array.from(document.querySelectorAll('.button'));
const buttonStarList = Array.from(document.querySelectorAll('.button-star'));

// Добавляет слушатель на кнопки добавления в избранное
function setListenersButtonStar(element, event) {
  element.forEach(item => {
    if (item.classList.contains('button-star_active')) {
      item.addEventListener(event, removeFavouritesHandler);
    } else {
      item.addEventListener(event, addFavouritesHandler);
    }
  })
}

// Добавляет слушатель на кнопки добаления в покупки
function setEventListeners(element, event, handler) {
  element.forEach(item => {
    item.addEventListener(event, handler);
  })
}

// Вызов функций
setEventListeners(recipeList, 'click', addRecipeHandler);
setListenersButtonStar(buttonStarList, 'click');
