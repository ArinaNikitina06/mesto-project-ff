// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// 2e6ea80b-30a6-4c71-bab6-c324b53f8521
// cohort-mag-4

import initialCards from "./cards.js";
import "../pages/index.css";
import {
  createCard,
} from "../components/card.js";
import { openPopUp, closePopUp, closePopupByEsc } from "../components/modal.js";
import {
  configPopupEditForm,
  configPopupCreateNewPlaceForm,
  enableValidation,
  clearValidation,
} from "./validation.js";

const placesList = document.querySelector(".places__list");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupPlaceOpenButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupList = document.querySelectorAll(".popup");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const popupEditProfileTitleInput = popupEdit.querySelector(
  ".popup__input_type_name"
);
const popupEditProfileDescriptionInput = popupEdit.querySelector(
  ".popup__input_type_description"
);
const popupEditForm = popupEdit.querySelector('[name="edit-profile"]');
const popupNewPlaceForm = popupNewPlace.querySelector('[name="new-place"]');

const popupCreateNewCardTitleInput = document.querySelector(
  ".popup__input_type_card-name"
);
const popupCreateNewCardDescriptionInput = document.querySelector(
  ".popup__input_type_url"
);

const popupOpenImageUrl = document.querySelector(".popup__image");
const popupOpenImageDescription = document.querySelector(".popup__caption");

enableValidation(popupEditForm, configPopupEditForm);
enableValidation(popupNewPlaceForm, configPopupCreateNewPlaceForm);

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfileTitleInput.value = profileTitle.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;
  clearValidation(popupEditForm, configPopupEditForm);
  openPopUp(popupEdit);
});

popupPlaceOpenButton.addEventListener("click", () => {
  clearValidation(popupNewPlaceForm, configPopupCreateNewPlaceForm);
  openPopUp(popupNewPlace);
});

popupEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = popupEditProfileTitleInput.value;
  profileDescription.textContent = popupEditProfileDescriptionInput.value;
  closePopUp(popupEdit);
  updateUserData({
  url: "https://nomoreparties.co/v1/cohort-mag-4/users/me",
  token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
}, {
    name: popupEditProfileTitleInput.value,
    about: popupEditProfileDescriptionInput.value,
  });
  e.target.reset();
});

popupNewPlaceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = popupCreateNewCardTitleInput.value;
  const link = popupCreateNewCardDescriptionInput.value;
  const cardElement = createCard(
    { name, link, likes: [] },
    likeHandler,
    removeCardHandler,
    openCardHandler
  );
  placesList.prepend(cardElement);
  closePopUp(popupNewPlace);
  updateUserPlace({
  url: "https://nomoreparties.co/v1/cohort-mag-4/cards",
  token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
}, {name: name,
    link: link
  })
  
  e.target.reset();
});

popupList.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target.closest(".popup__close")) {
      closePopUp(popup);
    }

    if (e.target === e.currentTarget) {
      closePopUp(popup);
    }
  });
});

function renderProfile({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
}

function createCards(initialCards) {
  initialCards.forEach((element) => {
    const cardElement = createCard(
      element,
      // likeHandler
      async (event) => {

        if (event.target.classList.contains('card__like-button_is-active')) {
          const result = await delLike({
            url: `https://nomoreparties.co/v1/cohort-mag-4/cards/likes/${element._id}`,
            token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
          });
          cardElement.querySelector(".card__likes-counter").textContent = result.likes.length
          cardElement
          .querySelector(".card__like-button")
          .classList.remove("card__like-button_is-active");
          console.log('удалили лайк');
        } else {
          const result = await addLike({
            url: `https://nomoreparties.co/v1/cohort-mag-4/cards/likes/${element._id}`,
            token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
          });
          cardElement.querySelector(".card__likes-counter").textContent = result.likes.length
          cardElement
          .querySelector(".card__like-button")
          .classList.add("card__like-button_is-active");
          console.log('добавили лайк');
        }
        
      },
      
      // removeCardHandler
      (event) => {
        
        console.log(element._id);
      },
      openCardHandler
    );
    placesList.append(cardElement);
  });
}

function openCardHandler(src, title) {
  popupOpenImageUrl.src = src;
  popupOpenImageUrl.alt = title;
  popupOpenImageDescription.textContent = title;
  openPopUp(popupImage);
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
      // console.log(result);
    });
}

function updateUserPlace({url,token}, payload){
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
      console.log(result);
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

const cardsPromise = getCards({
  url: "https://nomoreparties.co/v1/cohort-mag-4/cards",
  token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
});

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

const userDataPromise = getUserData({
  url: "https://nomoreparties.co/v1/cohort-mag-4/users/me ",
  token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
});

// init app
Promise.all([cardsPromise, userDataPromise]).then((data) => {
  const [initialCards, userData] = data;
  console.log(data);
  createCards(initialCards);
  renderProfile(userData);
});

function addLike({ url, token }){
   return fetch(url, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    }
  })
    .then((res) => res.json())
    .then((result) => {
      return result
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