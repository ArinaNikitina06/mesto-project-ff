// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// 2e6ea80b-30a6-4c71-bab6-c324b53f8521
// cohort-mag-4

import "../pages/index.css";
import {
  createCard,
  delCardHandler,
  delLikeHandler,
  addLikeHandler,
} from "../components/card.js";
import { openPopUp, closePopUp, closePopupByEsc } from "../components/modal.js";

import {clearValidation, enableValidation } from "./validation.js";
import {
  updateUserData,
  updateUserPlace,
  getCards,
  getUserData,
} from "../components/api.js";

import { config } from "./config.js";

const formConfig = {
  input: ".popup__input",
  inputErrorActive: "popup__input_type-error",
  spanError: ".popup__input-error",
  spanErrorActive: "popup__input-error_active",
  button: ".popup__button",
  form: ".popup__form",
};

let userId = "";
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

enableValidation(formConfig);

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfileTitleInput.value = profileTitle.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;
  clearValidation(popupEditForm, formConfig);
  openPopUp(popupEdit);
});

popupPlaceOpenButton.addEventListener("click", () => {
  openPopUp(popupNewPlace);
});

popupEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.querySelector(".popup__button").textContent = "Сохранение...";
  updateUserData(
    { ...config, baseUrl: config.baseUrl + "/users/me" },
    {
      name: popupEditProfileTitleInput.value,
      about: popupEditProfileDescriptionInput.value,
    }
  )
    .then((res) => {
      profileTitle.textContent = popupEditProfileTitleInput.value;
      profileDescription.textContent = popupEditProfileDescriptionInput.value;
      closePopUp(popupEdit);

      e.target.reset();
    })
    .catch((error) => {
      console.warn(error);
    });
});

popupNewPlaceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = popupCreateNewCardTitleInput.value;
  const link = popupCreateNewCardDescriptionInput.value;

  e.target.querySelector(".popup__button").textContent = "Сохранение...";

  updateUserPlace(
    { ...config, baseUrl: config.baseUrl + "/cards" },
    { name: name, link: link }
  )
    .then((res) => {
      const idCreatedCard = res._id;
      const owner = res.owner;

      const cardElement = createCard(
        { name, link, likes: [], owner },
        // likeHandler
        (event) => {
          if (event.target.classList.contains("card__like-button_is-active")) {
            delLikeHandler(idCreatedCard, cardElement);
          } else {
            addLikeHandler(idCreatedCard, cardElement);
          }
        },
        () => delCardHandler(idCreatedCard, cardElement),
        openCardHandler,
        userId
      );
      placesList.prepend(cardElement);
      closePopUp(popupNewPlace);

      e.target.reset();
    })
    .catch((error) => {
      console.warn(error);
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
     clearValidation(popupEditAvatarForm, formConfig);
  openPopUp(popupNewAvatar);
});

popupEditAvatarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.querySelector(".popup__button").textContent = "Сохранение...";
  updateUserData(
    { ...config, baseUrl: config.baseUrl + `/users/me/avatar` },
    { avatar: popupNewAvatarInput.value }
  )
    .then((res) => {
      if (res.errors) {
        throw new Error("update user avatar failed!");
      }

      profileAvatar.style.backgroundImage = `url(${popupNewAvatarInput.value})`;
    })
    .catch((error) => {
      console.warn(error);
    })
    .finally(() => closePopUp(popupNewAvatar));
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

      (event) => {
        if (event.target.classList.contains("card__like-button_is-active")) {
          delLikeHandler(element._id, cardElement);
        } else {
          addLikeHandler(element._id, cardElement);
        }
      },
      () => delCardHandler(element._id, cardElement),
      openCardHandler,
      userId
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
  ...config,
  baseUrl: config.baseUrl + `/cards`,
});

const userDataPromise = getUserData({
  ...config,
  baseUrl: config.baseUrl + `/users/me`,
});

Promise.all([cardsPromise, userDataPromise])
  .then((data) => {
    const [initialCards, userData] = data;
    userId = userData._id;
    createCards(initialCards);
    renderProfile(userData);
  })
  .catch((error) => {
    console.warn(error);
  });

