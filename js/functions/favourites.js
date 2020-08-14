// Добавляет в избранное
function addFavouritesHandler(event) {
  const iconElement = event.target;
  const favouritesId = iconElement.getAttribute('data-id');

  api.addFavourites(favouritesId).then(() => {
    iconElement.classList.remove('button-star_inactive');
    iconElement.classList.add('button-star_active');

    iconElement.removeEventListener('click', addFavouritesHandler);
    iconElement.addEventListener('click', removeFavouritesHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Удаляет из избранного
function removeFavouritesHandler(event) {
  const iconElement = event.target;
  const favouritesId = iconElement.getAttribute('data-id');

  api.removeFavourites(favouritesId).then(() => {
    iconElement.classList.remove('button-star_active');
    iconElement.classList.add('button-star_inactive');

    iconElement.removeEventListener('click', removeFavouritesHandler);
    iconElement.addEventListener('click', addFavouritesHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}