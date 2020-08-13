const ingredients = document.querySelector('#ingredients');
const errorIngredients = document.querySelector('#error-ingredients');
const tooltiptext = document.querySelector('#tooltiptext');

class Api {
  constructor(options) {
    this._options = options;
  }

  getIngredients(query) {
    return fetch(`${this._options.baseUrl}/ingredients?query=${query}`, {
      method: 'GET',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((err) => Promise.reject(`Что-то пошло не так: ${err.status}`));
  }

}

const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function search() {
  tooltiptext.textContent = '';

  api.getIngredients(ingredients.value)
    .then(result => {
      console.log(result.title);
      console.log(result);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      errorIngredients.textContent = err;
      errorIngredients.classList.add('.recipe-create__error_active');
    })
}

ingredients.addEventListener('input', search());