const ingredients = document.querySelector('#ingredients');
const errorIngredients = document.querySelector('#error-ingredients');
const ingredientsList = document.querySelector('.recipe-create__tooltiptext');
const ingredientsCount = document.querySelector('#ingredientsCount');
const ingredientsItems = document.querySelector('.recipe-create__ingredients-items');
const buttonAddIngredient = document.querySelector('.recipe-create__button-add');

class Api {
  constructor(options) {
    this._options = options;
  }

  getIngredients(query) {
    return fetch(`${this._options.baseUrl}/ingredients?query=${query}`, {
      // method: 'GET',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((err) => Promise.reject(err.status));
  }
}

const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

class Ingredients {
  constructor(api, ingredients, ingredientsCount, ingredientsList, buttonAddIngredient) {
    this.api = api;
    this.ingredientsList = ingredientsList;
    this.ingredients = ingredients;
    this.ingredientsCount = ingredientsCount;
    this.buttonAddIngredient = buttonAddIngredient;
    this.debounceSearchIngredient = this.debounce(this.searchIngredient.bind(this), 1000);

    this.buttonAddIngredient.addEventListener('click', this.addIngredient);
    this.ingredients.addEventListener('input', this.debounceSearchIngredient.bind(this));
    this.ingredientsList.addEventListener('focus', this.pasteIngredient);
  }

  debounce(f, t) {
    return function () {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && ((this.lastCall - previousCall) <= t)) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(() => f(), t);
    }
  }

  // добавляем text в span с data-id = id, и вставляем в domElement
  addIngredientTextElement(text, domElement, id) {
    const paragraph = document.createElement('span');
    if(id) {
      paragraph.setAttribute('data-id', id);
    }
    paragraph.textContent = text;
    domElement.prepend(paragraph);
  }


  // посылаем запрос с символами и получаем массив элементов где в array[i].title есть эти символы
  searchIngredient() {
    this.ingredientsList.textContent = '';
    this.api.getIngredients(this.ingredients)
      .then(result => {
        result.forEach((item, i) => {
          this.addIngredientTextElement(item.title, this.ingredientsList, i)
        });
        if(result.length === 1) {
          this.ingredients.value = result[0].title;
          this.ingredientsCount.value = result[0].dimension;
        }
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        errorIngredients.textContent = `Ошибка: ${err}`;
        errorIngredients.classList.add('recipe-create__error_active');
      })
  }

  addIngredient() {
    this.api.getIngredients(this.ingredients)
      .then(result => {
        if (this.ingredientsList.textContent === result[0].title || ingredients.value === result[0].title) {
          this.addIngredientTextElement(result[0].title, ingredientsItems);
        }
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        errorIngredients.textContent = err;
        errorIngredients.classList.add('.recipe-create__error_active');
      })
  }

  pasteIngredient(event) {
    if (event.target.hasAttribute('data-id')) {
      let id = event.target.getAttribute('data-id');

      this.api.getIngredients(this.ingredients)
        .then(result => {
          this.ingredients.value = result[id].title;
          this.ingredientsCount.value = result[id].dimension;
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
          errorIngredients.textContent = err;
          errorIngredients.classList.add('.recipe-create__error_active');
        })
    }
  }

}
new Ingredients(api, ingredients, ingredientsCount, ingredientsList, buttonAddIngredient);
