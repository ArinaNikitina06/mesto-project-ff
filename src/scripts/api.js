function addLike({ baseUrl, headers }) {
  return fetch(baseUrl, {
    method: "PUT",
		headers,
  })
    .then((res) => res.json())
    .then((result) => result);
}

function delLike({ baseUrl, headers }) {
  return fetch(baseUrl, {
    method: "DELETE",
		headers,
  })
    .then((res) => res.json())
    .then((result) => result);
}

function delCard({ baseUrl, headers }) {
  return fetch(baseUrl, {
    method: "DELETE",
		headers,
  })
    .then((res) => res.json())
    .then((result) => result);
}
function getUserData({ baseUrl, headers }) {
  return fetch(baseUrl, {
		headers
	})
    .then((res) => res.json())
    .then((result) => result);
}

function getCards({ baseUrl, headers }) {
  return fetch(baseUrl, {
		headers
	})
    .then((res) => res.json())
    .then((result) => result);
}

function updateUserPlace({ baseUrl, headers }, payload) {
  return fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(payload),
		headers,
  })
    .then((res) => res.json())
    .then((result) => result);
}

function updateUserData({ baseUrl, headers }, payload) {
  return fetch(baseUrl, {
    method: "PATCH",
    body: JSON.stringify(payload),
		headers,
  })
    .then((res) => res.json())
    .then((result) => result);
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