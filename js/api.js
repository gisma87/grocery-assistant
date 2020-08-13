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

  addSubscribtion(subscrId) {
    return fetch(`${this._options.baseUrl}/subscribtions`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        id: subscrId
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch((err) => Promise.reject(err));
  }

  removeSubscribtion(subscrId) {
    return fetch(`${this._options.baseUrl}/subscribtions/${subscrId}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch((err) => Promise.reject(err));
  }

}