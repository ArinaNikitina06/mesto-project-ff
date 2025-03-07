function handleResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function addLike({ baseUrl, headers }) {
  return fetch(baseUrl, {
    method: "PUT",
    headers,
  })
    .then(handleResponce)
}

function delLike({ baseUrl, headers }) {
  return fetch(baseUrl, {
    method: "DELETE",
    headers,
  })
    .then(handleResponce)
}

function delCard({ baseUrl, headers }) {
  return fetch(baseUrl, {
    method: "DELETE",
    headers,
  })
    .then(handleResponce)
}

function getUserData({ baseUrl, headers }) {
  return fetch(baseUrl, {
    headers,
  })
    .then(handleResponce)
}

function getCards({ baseUrl, headers }) {
  return fetch(baseUrl, {
    headers,
  })
    .then(handleResponce)
}

function updateUserPlace({ baseUrl, headers }, payload) {
  return fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
  })
    .then(handleResponce)
}

function updateUserData({ baseUrl, headers }, payload) {
  return fetch(baseUrl, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers,
  })
    .then(handleResponce)
}

export {
  addLike,
  updateUserData,
  updateUserPlace,
  getCards,
  getUserData,
  delCard,
  delLike,
};
