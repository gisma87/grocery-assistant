import Ingredients from "./Ingredients.js";

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

const api = new Api({
  baseUrl: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

new Ingredients(api, ingredients, ingredientsCount, ingredientsTag, ingredientsList, containerIngredientItems, buttonAddIngredient);

// контейнер div со span'ом-название загружаемого фала и кнопка удаления этого файла - по умолчанию display: none
const containerFileAdd = document.querySelector('.recipe-create__block-usefile');

// span с названием загружаемого файла
const spanFileName = document.querySelector('.recipe-create__usefile');

// input[type='file']
const fileAdd = document.querySelector('#addFile');

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

fileAdd.addEventListener('change', pasteFileName);
buttonDel.addEventListener('click', delFile);