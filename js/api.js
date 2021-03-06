class Api {
  constructor(options) {
    this._options = options;
  }

  getPurchases() {
    return fetch(`${this._options.baseUrl}/purchases`, {
      method: 'GET',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((err) => Promise.reject(err.status));
  }

  // проверяет ингридиенты по запросу query
  getIngredients(query) {
    return fetch(`${this._options.baseUrl}/ingredients?query=${query}`, {
      method: 'GET',
      headers: this._options.headers
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => Promise.reject(err.status));
  }

  addRecipe(recipeId) {
    return fetch(`${this._options.baseUrl}/purchases`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        id: recipeId
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((err) => Promise.reject(err));
  }

  removeRecipe(recipeId) {
    return fetch(`${this._options.baseUrl}/purchases/${recipeId}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((err) => Promise.reject(err));
  }

  addSubscribtion(subscribtionId) {
    return fetch(`${this._options.baseUrl}/subscriptions`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        id: subscribtionId
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((err) => Promise.reject(err));
  }

  removeSubscribtion(subscribtionId) {
    return fetch(`${this._options.baseUrl}/subscriptions/${subscribtionId}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((err) => Promise.reject(err));
  }

  addFavourites(favouritesId) {
    return fetch(`${this._options.baseUrl}/favorites`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        id: favouritesId
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((err) => Promise.reject(err));
  }

  removeFavourites(favouritesId) {
    return fetch(`${this._options.baseUrl}/favorites/${favouritesId}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((err) => Promise.reject(err));
  }

}