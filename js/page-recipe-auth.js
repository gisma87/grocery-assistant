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

// Добавляет рецепт в покупки
function addRecipeHandler() {
  const recipeId = event.target.getAttribute('data-recipe-id');
  const iconElement = event.target;

  api.addRecipe(recipeId).then(() => {
    iconElement.classList.remove('button_color_grey');
    iconElement.classList.add('button_type_tick', 'button_color_white');
    iconElement.textContent = 'Рецепт добавлен';

    iconElement.removeEventListener('click', addRecipeHandler);
    iconElement.addEventListener('click', removeRecipeHandler);
  })
  .catch((err) => {
    console.log(err);
  });
}

// Удаляет рецепт из покупок
function removeRecipeHandler() {
  const recipeId = event.target.getAttribute('data-recipe-id');
  const iconElement = event.target;

  api.removeRecipe(recipeId).then(() => {
    iconElement.classList.remove('button_type_tick', 'button_color_white');
    iconElement.classList.add('button_color_grey');
    iconElement.textContent = 'Добавить в покупки';

    iconElement.removeEventListener('click', removeRecipeHandler);
    iconElement.addEventListener('click', addRecipeHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Подписаться на автора
function addSubscribtionHandler() {
  const subscribtionId = event.target.getAttribute('data-author-id');
  const iconElement = event.target;

  api.addSubscribtion(subscribtionId).then(() => {
    iconElement.textContent = 'Отписаться от автора';

    iconElement.removeEventListener('click', addSubscribtionHandler);
    iconElement.addEventListener('click', removeSubscribtionHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Отписаться от автора
function removeSubscribtionHandler() {
  const subscribtionId = event.target.getAttribute('data-author-id');
  const iconElement = event.target;

  api.removeSubscribtion(subscribtionId).then(() => {
    iconElement.textContent = 'Подписаться на автора';

    iconElement.removeEventListener('click', removeSubscribtionHandler);
    iconElement.addEventListener('click', addSubscribtionHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Добавляет в избранное
function addFavouritesHandler() {
  const favouritesId = event.target.getAttribute('data-id');
  const iconElement = event.target;

  api.addFavourites(favouritesId).then(() => {
    iconElement.classList.remove('button-star_inactived');
    iconElement.classList.add('button-star_actived');

    iconElement.removeEventListener('click', addFavouritesHandler);
    iconElement.addEventListener('click', removeFavouritesHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Удаляет из избранного
function removeFavouritesHandler() {
  const subscribtionId = event.target.getAttribute('data-id');
  const iconElement = event.target;

  api.removeFavourites(subscribtionId).then(() => {
    iconElement.classList.remove('button-star_actived');
    iconElement.classList.add('button-star_inactived');

    iconElement.removeEventListener('click', removeFavouritesHandler);
    iconElement.addEventListener('click', addFavouritesHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Добавляет слушатели
buttonStar.addEventListener('click', addFavouritesHandler);
buttonRecipe.addEventListener('click', addRecipeHandler);
buttonAuthor.addEventListener('click', addSubscribtionHandler);

