class Api {
  constructor({ address }) {
    this._address = address;
  }

  _responseProcessing() {
    return (res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      }
    })
      .then(this._responseProcessing())
  }

  sendCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._responseProcessing())
  }

  getProfileInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      }
    })
      .then(this._responseProcessing())
  }

  sendProfileInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._responseProcessing())
  }

  sendAvatar(data) {
    console.log(data);
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      },
      body: JSON.stringify({
        avatar: data
      })
    })
      .then(this._responseProcessing())
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      },
    })
      .then(this._responseProcessing())
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      },
    })
      .then(this._responseProcessing())
  }

  setToken(token) {
    localStorage.setItem('jwt', token);
    this._token = token;
  }

}
const api = new Api({
  address: 'https://api.mesto.natasha.snezh.nomoredomains.xyz',
});

export default api;