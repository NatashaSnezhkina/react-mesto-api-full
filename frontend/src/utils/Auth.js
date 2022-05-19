export const BASE_URL = 'https://api.mesto.natasha.snezh.nomoredomains.xyz';

const checkResponse = (response) => {
  const data = response.json();
  if (response.ok) {
    return data;
  }
  // const { statusCode } = data;
  // const { message } = data.message[0].messages[0]
  // const error = new Error(message || 'Что-то пошло не так');
  // error.status = statusCode;
  // throw error
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
      "Content-Type": "application/json",
      "Content": "hi!",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res))
    // .then(res => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const getContent = (token) => {
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
