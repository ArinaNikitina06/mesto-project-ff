function addLike({ url, token }) {
  return fetch(url, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function delLike({ url, token }) {
  return fetch(url, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function delCard({ url, token }) {
  return fetch(url, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}
function getUserData({ url, token }) {
  return fetch(url, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
function getCards({ url, token }) {
  return fetch(url, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
function updateUserPlace({ url, token }, payload) {
  return fetch(url, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
      // 'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
function updateUserData({ url, token }, payload) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
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