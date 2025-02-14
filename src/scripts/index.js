// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// 2e6ea80b-30a6-4c71-bab6-c324b53f8521
// cohort-mag-4

import initialCards from "./cards.js";
import "../pages/index.css";
import { createCard } from "../components/card.js";
import { openPopUp, closePopUp, closePopupByEsc } from "../components/modal.js";
import {
  configPopupEditForm,
  configPopupCreateNewPlaceForm,
  configPopupEditAvatarForm,
  enableValidation,
  clearValidation,
} from "./validation.js";

import{
  addLike,
  updateUserData,
  updateUserPlace,
  getCards,
  getUserData,
  delCard,
  delLike,
} from "./api.js";

const placesList = document.querySelector(".places__list");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupPlaceOpenButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupNewAvatar = document.querySelector(".popup_edit-avatar");
const popupNewAvatarInput = popupNewAvatar.querySelector(
  ".popup__input_type-new-avatar"
);

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
const popupEditAvatarForm = popupNewAvatar.querySelector('[name="new-avatar"]');
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
enableValidation(popupEditAvatarForm, configPopupEditAvatarForm);

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
  e.target.querySelector(".popup__button").textContent = "Сохранение...";
  updateUserData(
    {
      url: "https://nomoreparties.co/v1/cohort-mag-4/users/me",
      token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
    },
    {
      name: popupEditProfileTitleInput.value,
      about: popupEditProfileDescriptionInput.value,
    }
  ).then(res => {

    profileTitle.textContent = popupEditProfileTitleInput.value;
    profileDescription.textContent = popupEditProfileDescriptionInput.value;
    closePopUp(popupEdit);
    
    e.target.reset();
  })
});

popupNewPlaceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = popupCreateNewCardTitleInput.value;
  const link = popupCreateNewCardDescriptionInput.value;

  e.target.querySelector(".popup__button").textContent = "Сохранение...";

  updateUserPlace(
    {
      url: "https://nomoreparties.co/v1/cohort-mag-4/cards",
      token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
    },
    { name: name, link: link }
  ).then((res) => {
    const idCreatedCard = res._id;
    const owner = res.owner;

    const cardElement = createCard(
      { name, link, likes: [], owner },
      // likeHandler
      async (event) => {
        if (event.target.classList.contains("card__like-button_is-active")) {
          const result = await delLike({
            url: `https://nomoreparties.co/v1/cohort-mag-4/cards/likes/${idCreatedCard}`,
            token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
          });
          cardElement.querySelector(".card__likes-counter").textContent =
            result.likes.length;
          cardElement
            .querySelector(".card__like-button")
            .classList.remove("card__like-button_is-active");
          console.log("удалили лайк");
        } else {
          const result = await addLike({
            url: `https://nomoreparties.co/v1/cohort-mag-4/cards/likes/${idCreatedCard}`,
            token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
          });
          cardElement.querySelector(".card__likes-counter").textContent =
            result.likes.length;
          cardElement
            .querySelector(".card__like-button")
            .classList.add("card__like-button_is-active");
          console.log("добавили лайк");
        }
      },
      () => {
        delCard({
          url: `https://nomoreparties.co/v1/cohort-mag-4/cards/${idCreatedCard}`,
          token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
        }).then((result) => cardElement.remove());
      },
      openCardHandler
    );
    placesList.prepend(cardElement);
    closePopUp(popupNewPlace);

    e.target.reset();
  });
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

profileAvatar.addEventListener("click", () => {
  clearValidation(popupEditAvatarForm, configPopupEditAvatarForm);
  openPopUp(popupNewAvatar);
});

popupEditAvatarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.querySelector(".popup__button").textContent = "Сохранение...";
  updateUserData(
    {
      url: `https://nomoreparties.co/v1/cohort-mag-4/users/me/avatar`,
      token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
    },
    { avatar: popupNewAvatarInput.value }
  )
    .then((res) => {
      if (res.errors) {
        throw new Error("update user avatar failed!");
      }
      // успех
      profileAvatar.style.backgroundImage = `url(${popupNewAvatarInput.value})`;
    })
    .catch((error) => console.error("test->", error));
});

// popupNewAvatarInput;

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
        if (event.target.classList.contains("card__like-button_is-active")) {
          const result = await delLike({
            url: `https://nomoreparties.co/v1/cohort-mag-4/cards/likes/${element._id}`,
            token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
          });
          cardElement.querySelector(".card__likes-counter").textContent =
            result.likes.length;
          cardElement
            .querySelector(".card__like-button")
            .classList.remove("card__like-button_is-active");
          console.log("удалили лайк");
        } else {
          const result = await addLike({
            url: `https://nomoreparties.co/v1/cohort-mag-4/cards/likes/${element._id}`,
            token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
          });
          cardElement.querySelector(".card__likes-counter").textContent =
            result.likes.length;
          cardElement
            .querySelector(".card__like-button")
            .classList.add("card__like-button_is-active");
          console.log("добавили лайк");
        }
      },

      // removeCardHandler
      () => {
        delCard({
          url: `https://nomoreparties.co/v1/cohort-mag-4/cards/${element._id}`,
          token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
        }).then((result) => cardElement.remove());
        // console.log(element._id);
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

const cardsPromise = getCards({
  url: "https://nomoreparties.co/v1/cohort-mag-4/cards",
  token: "2e6ea80b-30a6-4c71-bab6-c324b53f8521",
});

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