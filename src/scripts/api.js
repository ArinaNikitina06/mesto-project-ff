function handleResponce(res){
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
    .then((result) => result)
    .catch((error) => console.log("my error ->", error));
}

function delLike({ baseUrl, headers }) {
  return fetch(baseUrl, {
    method: "DELETE",
    headers,
  })
    .then(handleResponce)
    .then((result) => result)
    .catch((error) => console.log("my error ->", error));
}

function delCard({ baseUrl, headers }) {
  return fetch(baseUrl, {
    method: "DELETE",
    headers,
  })
    .then(handleResponce)
    .then((result) => result)
    .catch((error) => console.log("my error ->", error));
}
function getUserData({ baseUrl, headers }) {
  return fetch(baseUrl, {
    headers,
  })
    .then(handleResponce )
    .then((result) => result)
    .catch((error) => console.log("my error ->", error));
}

function getCards({ baseUrl, headers }) {
  return fetch(baseUrl, {
    headers,
  })
    .then(handleResponce)
    .then((result) => result)
    .catch((error) => console.log("my error ->", error));
}

function updateUserPlace({ baseUrl, headers }, payload) {
  return fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
  })
    .then(handleResponce)
    .then((result) => result)
    .catch((error) => console.log("my error ->", error));
}

function updateUserData({ baseUrl, headers }, payload) {
  return fetch(baseUrl, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers,
  })
    .then(handleResponce)
    .then((result) => result)
    .catch((error) => console.log("my error ->", error));
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
