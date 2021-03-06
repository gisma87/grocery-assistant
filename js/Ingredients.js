import { debounce } from "./functions/debounce.js";

export default class Ingredients {
  constructor(api, ingredients, ingredientsCount, ingredientsTag, ingredientsList, containerIngredientItems, buttonAddIngredient) {
    this.api = api;
    this.ingredientsList = ingredientsList;
    this.ingredients = ingredients;
    this.ingredientsTag = ingredientsTag;
    this.ingredientsCount = ingredientsCount;
    this.buttonAddIngredient = buttonAddIngredient;
    this.containerIngredientItems = containerIngredientItems;
    this.debounceSearchIngredient = debounce(this.searchIngredient.bind(this), 1000);

    this.buttonAddIngredient.addEventListener('click', this.addIngredient.bind(this));
    this.ingredients.addEventListener('input', this.debounceSearchIngredient);
    this.ingredientsList.addEventListener('click', this.pasteIngredient.bind(this));
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

    ingredientsItem.value = item;
    ingredientsCount.value = count;
    ingredientsTag.textContent = tag;

    const template = fragment.cloneNode(true);

    template.querySelector('.recipe-create__button-delete').addEventListener('click', this.deleteItem.bind(this));
    const parentInput = this.ingredients.closest('.recipe-create__container-ingredients');
    this.containerIngredientItems.insertBefore(template, parentInput);
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
      })
  }

  // если текст в поле ингредиента соответствует какому-нибудь arr[i].title, то добавляет его в this.ingredientsCount в теге span
  addIngredient() {
    this.api.getIngredients(this.ingredients.value)
      .then(result => {
        const even = (element) => element.title === this.ingredients.value;
        if (result.some(even)) {
          this.createIngredient(this.ingredients.value, this.ingredientsCount.value, this.ingredientsTag.textContent);
          this.ingredients.value = '';
          this.ingredientsCount.value = '';
          this.ingredientsList.innerHTML = '';
        }
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
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
        })
    }
  }

}