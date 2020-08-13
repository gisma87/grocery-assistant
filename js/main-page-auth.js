const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Переменные
const recipeList = Array.from(document.querySelectorAll('.button'));
const buttonStarList = Array.from(document.querySelectorAll('.button-star'));

// Добавляет рецепт в покупки
function saveRecipeHandler() {
  const recipeId = event.target.getAttribute('data-recipe-id');
  const iconElement = event.target;

  api.addRecipe(recipeId).then(() => {
    iconElement.classList.remove('button_color_grey');
    iconElement.classList.add('button_type_tick', 'button_color_white');
    iconElement.textContent = 'Рецепт добавлен';

    iconElement.removeEventListener('click', saveRecipeHandler);
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
    iconElement.addEventListener('click', saveRecipeHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Добавляет в избранное
function addSubscribtionHandler() {
  const favouritesId = event.target.getAttribute('data-author-id');
  const iconElement = event.target;

  api.addSubscribtion(favouritesId).then(() => {
    iconElement.classList.remove('button-star_inactived');
    iconElement.classList.add('button-star_actived');

    iconElement.removeEventListener('click', addSubscribtionHandler);
    iconElement.addEventListener('click', removeSubscribtionHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Удаляет из избранного
function removeSubscribtionHandler() {
  const favouritesId = event.target.getAttribute('data-author-id');
  const iconElement = event.target;

  api.removeSubscribtion(favouritesId).then(() => {
    iconElement.classList.remove('button-star_actived');
    iconElement.classList.add('button-star_inactived');

    iconElement.removeEventListener('click', removeSubscribtionHandler);
    iconElement.addEventListener('click', addSubscribtionHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Добавляет слушатель на все кнопки
function setEventListeners(element, event, handler) {
  element.forEach(item => {
    item.addEventListener(event, handler);
  })
}

// Вызов функций
setEventListeners(recipeList, 'click', saveRecipeHandler);
setEventListeners(buttonStarList, 'click', addSubscribtionHandler);

api.getPurchases();