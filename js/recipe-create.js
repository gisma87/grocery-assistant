// input куда вводятся ингредиенты
const ingredients = document.querySelector('#ingredients');

// поле ошибки под input ингредиентов
const errorIngredients = document.querySelector('#error-ingredients');

// выпадающий список массива найденных по данному запросу ингредиентов arr[i].title
const ingredientsList = document.querySelector('.recipe-create__tooltiptext');

// поле количественной единицы ингредиента - arr[i].dimension
const ingredientsCount = document.querySelector('#ingredientsCount');

// поле - список для добавления ингредиентов после нажатия кнопки 'Добавить ингредиент'
const ingredientsItems = document.querySelector('.recipe-create__ingredients-items');

// кнопка 'Добавить ингредиент'
const buttonAddIngredient = document.querySelector('.recipe-create__button-add');


class Api {
  constructor(options) {
    this._options = options;
  }

  getIngredients(query) {
    return fetch(`${this._options.baseUrl}/ingredients?query=${query}`, {
      method: 'GET',
      headers: this._options.headers
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
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
  constructor(api, ingredients, ingredientsCount, ingredientsList, buttonAddIngredient,ingredientsItems) {
    this.api = api;
    this.ingredientsList = ingredientsList;
    this.ingredients = ingredients;
    this.ingredientsCount = ingredientsCount;
    this.buttonAddIngredient = buttonAddIngredient;
    this.ingredientsItems = ingredientsItems;
    this.debounceSearchIngredient = this.debounce(this.searchIngredient.bind(this), 1000);

    this.buttonAddIngredient.addEventListener('click', this.addIngredient);
    this.ingredients.addEventListener('input', this.debounceSearchIngredient);
    this.ingredientsList.addEventListener('focus', this.pasteIngredient);
  }

  //выполняет функцию f через время t от последнего вызова
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
    this.api.getIngredients(this.ingredients.value)
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

  // если текст в поле ингредиента соответствует какому-нибудь arr[i].title, то добавляет его в this.ingredientsItems в теге span
  addIngredient() {
    this.api.getIngredients(this.ingredients.value)
      .then(result => {
        const even = (element) => element.title === this.ingredients.value;
        if (result.some(even)) {
          this.addIngredientTextElement(this.ingredients.value, this.ingredientsItems);
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

      this.api.getIngredients(this.ingredients.value)
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
new Ingredients(api, ingredients, ingredientsCount, ingredientsList, buttonAddIngredient, ingredientsItems);

const containerFileAdd = document.querySelector('.recipe-create__block-usefile');
const spanFileName = document.querySelector('.recipe-create__usefile');
const fileAdd = document.querySelector('#addFile');
const fileName = fileAdd.value;
const buttonFileAdd = document.querySelector('.recipe-create__button');

function pasteFileName() {
  spanFileName.textContent = fileName.replace(/.*\\/, "");
  containerFileAdd.classList.add('recipe-create__block-usefile_active');
}

buttonFileAdd.addEventListener('click', pasteFileName);
