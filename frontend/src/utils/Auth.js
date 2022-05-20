export const BASE_URL = 'https://api.mesto.natasha.snezh.nomoredomains.xyz';

const checkResponse = (response) => {
  const data = response.json();
  if (response.ok) {
    return data;
  }
  return Promise.reject(`Ошибка ${response.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return
      }
    });
};

export const getContent = (token) => {
  console.log('getContent')
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResponse)
}
