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

// Добавляет слушатели
buttonStar.addEventListener('click', addFavouritesHandler);
buttonRecipe.addEventListener('click', addRecipeHandler);
buttonAuthor.addEventListener('click', addSubscribtionHandler);

