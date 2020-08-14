// input куда вводятся ингредиенты
const ingredients = document.querySelector('#ingredients');

// поле ошибки под input ингредиентов
const errorIngredients = document.querySelector('#error-ingredients');

// выпадающий список массива найденных по данному запросу ингредиентов arr[i].title
const ingredientsList = document.querySelector('.recipe-create__tooltiptext');

// label количественной единицы ингредиента (шт, гр, мл) - arr[i].dimension
const ingredientsTag = document.querySelector('#ingredientsTag');

// поле - количество ингредиента - цифра
const ingredientsCount = document.querySelector('#ingredientsCount');

// кнопка 'Добавить ингредиент'
const buttonAddIngredient = document.querySelector('.recipe-create__button-add');

// Контейнер для ингредиентов - сюда добавляются по нажатию "Добавить ингредиент"
const containerIngredientItems = document.querySelector('.recipe-create__row-form_grid_inputs-ingredients');

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
  constructor(api, ingredients, ingredientsCount, ingredientsTag, ingredientsList, containerIngredientItems, buttonAddIngredient) {
    this.api = api;
    this.ingredientsList = ingredientsList;
    this.ingredients = ingredients;
    this.ingredientsTag = ingredientsTag;
    this.ingredientsCount = ingredientsCount;
    this.buttonAddIngredient = buttonAddIngredient;
    this.containerIngredientItems = containerIngredientItems;
    this.debounceSearchIngredient = this.debounce(this.searchIngredient.bind(this), 1000);

    this.buttonAddIngredient.addEventListener('click', this.addIngredient.bind(this));
    this.ingredients.addEventListener('input', this.debounceSearchIngredient);
    this.ingredientsList.addEventListener('click', this.pasteIngredient.bind(this));
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
    if (id) {
      paragraph.setAttribute('data-id', id);
    }
    paragraph.textContent = text;
    domElement.prepend(paragraph);
  }

  createIngredient(item, count, tag) {
    const tmpl = document.querySelector('#tmpl');
    const fragment = (tmpl.content).cloneNode(true);
    const ingredientsItem = fragment.querySelector('.recipe-create__ingredients-item');
    const ingredientsCount = fragment.querySelector('.recipe-create__ingredients-count');
    const ingredientsTag = fragment.querySelector('.recipe-create__ingredients-tag');

    ingredientsItem.textContent = item;
    ingredientsCount.textContent = count;
    ingredientsTag.textContent = tag;

    const template = fragment.cloneNode(true);

    template.querySelector('.recipe-create__button-delete').addEventListener('click', this.deleteItem.bind(this));
    this.containerIngredientItems.appendChild(template);
  }



  deleteItem(event) {
    if (event.target.matches('.recipe-create__button-delete')) {
      const ingredient = (event.target).closest('.ingredient-item');
      this.containerIngredientItems.removeChild(ingredient);
    }
  }

  // посылаем запрос с символами и получаем массив элементов где в array[i].title есть эти символы
  searchIngredient() {
    this.ingredientsList.textContent = '';
    this.api.getIngredients(this.ingredients.value)
      .then(result => {
        result.forEach((item, i) => {
          this.addIngredientTextElement(item.title, this.ingredientsList, i + 1)
        });
        if (result.length === 1) {
          this.ingredients.value = result[0].title;
          this.ingredientsTag.textContent = result[0].dimension;
        }
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        errorIngredients.textContent = `Ошибка: ${err}`;
        errorIngredients.classList.add('recipe-create__error_active');
      })
  }

  // если текст в поле ингредиента соответствует какому-нибудь arr[i].title, то добавляет его в this.ingredientsCount в теге span
  addIngredient() {
    this.api.getIngredients(this.ingredients.value)
      .then(result => {
        const even = (element) => element.title === this.ingredients.value;
        if (result.some(even)) {
          this.createIngredient(this.ingredients.value, this.ingredientsCount.value, this.ingredientsTag.textContent);
        }
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        errorIngredients.textContent = err;
        errorIngredients.classList.add('.recipe-create__error_active');
      })
  }

  // вставляем данные из всплывающего списка в input ingredient
  pasteIngredient(event) {
    if (event.target.hasAttribute('data-id')) {
      let id = event.target.getAttribute('data-id') - 1;

      this.api.getIngredients(this.ingredients.value)
        .then(result => {
          this.ingredients.value = result[id].title;
          this.ingredientsTag.textContent = result[id].dimension;
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
          errorIngredients.textContent = err;
          errorIngredients.classList.add('.recipe-create__error_active');
        })
    }
  }

}

new Ingredients(api, ingredients, ingredientsCount, ingredientsTag, ingredientsList, containerIngredientItems, buttonAddIngredient);

// контейнер div со span'ом-название загружаемого фала и кнопка удаления этого файла - по умолчанию display: none
const containerFileAdd = document.querySelector('.recipe-create__block-usefile');

// span с названием загружаемого файла
const spanFileName = document.querySelector('.recipe-create__usefile');

// input[type='file']
const fileAdd = document.querySelector('#addFile');

// кнопка 'Выбрать файл' - label для input[type='file']
const buttonFileAdd = document.querySelector('.recipe-create__button');

// вставляет название загружаемого файла в нужный блок, и делает его видимым.
function pasteFileName() {
  containerFileAdd.classList.add('recipe-create__block-usefile_active');
  const fileName = fileAdd.value.replace(/.*\\/, "");
  return spanFileName.textContent = fileName;
}

// кнопка удаления загружаемого файла
const buttonDel = document.querySelector('.recipe-create__button-delete');

// удаляет файл и скрывает блок с названием
function delFile() {
  fileAdd.value = '';
  containerFileAdd.classList.remove('recipe-create__block-usefile_active');
}

buttonFileAdd.addEventListener('click', pasteFileName);
buttonDel.addEventListener('click', delFile);