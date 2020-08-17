function removeShoppingHandler(event) {
  const iconElement = event.target;
  const recipeId = iconElement.getAttribute('data-recipe-id');

  api.removeRecipe(recipeId).then(() => {
    iconElement.parentNode.remove();
    iconElement.removeEventListener('click', removeShoppingHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}