const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Переменные
const buttonStar = document.querySelector('.button-star');
const buttonRecipe = document.querySelector('.recipe__button');
const buttonAuthor = document.querySelector('.button_color_grey');

// Добавляет слушатель на кнопки добавления в избранное
function setListeners(element, event) {
    if (element.classList.contains('button-star_active')) {
      element.addEventListener(event, removeFavouritesHandler);
    } else {
      element.addEventListener(event, addFavouritesHandler);
    }
}

// Добавляет слушатели
buttonRecipe.addEventListener('click', addRecipeHandler);
buttonAuthor.addEventListener('click', addSubscribtionHandler);

// Вызов функций
setListeners(buttonStar, 'click');

