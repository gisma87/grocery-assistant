const ingredients = document.querySelector('#ingredients');
const errorIngredients = document.querySelector('#error-ingredients');
const tooltiptext = document.querySelector('#tooltiptext');

const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

