// Добавляет в избранное
function addFavouritesHandler() {
  const favouritesIdId = event.target.getAttribute('data-id');
  const iconElement = event.target;

  api.addFavourites(favouritesIdId).then(() => {
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
function removeFavouritesHandler() {
  const favouritesId = event.target.getAttribute('data-id');
  const iconElement = event.target;

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