const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Переменные
const buttonRecipe = document.querySelector('.recipe__button');

// Добавляет слушатели
buttonRecipe.addEventListener('click', addRecipeHandler);