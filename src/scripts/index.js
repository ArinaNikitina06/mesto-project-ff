// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import initialCards from "./cards.js";
import "../pages/index.css";
import {
  createCard,
  removeCardHandler,
  likeHandler,
} from "../components/card.js";
import { openPopUp, closePopUp, closePopupByEsc } from "../components/model.js";

const placesList = document.querySelector(".places__list");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupPlaceOpenButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupList = document.querySelectorAll(".popup");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
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


popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfileTitleInput.value = profileTitle.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;
  openPopUp(popupEdit);
});

popupPlaceOpenButton.addEventListener("click", () => {
  openPopUp(popupNewPlace);
});

popupEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = popupEditProfileTitleInput.value;
  profileDescription.textContent = popupEditProfileDescriptionInput.value;
  closePopUp(popupEdit);
  e.target.reset();
});

popupNewPlaceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = popupCreateNewCardTitleInput.value;
  const link = popupCreateNewCardDescriptionInput.value;
  const cardElement = createCard({ name, link }, likeHandler,
  removeCardHandler,
  openCardHandler);
  placesList.prepend(cardElement);
  closePopUp(popupNewPlace);
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


function createCards(initialCards) {
  initialCards.forEach((element) => {
    const cardElement = createCard(
      element,
      likeHandler,
      removeCardHandler,
      openCardHandler
    );
    placesList.append(cardElement);
  });
}

createCards(initialCards);

function openCardHandler(src, title) {
  popupOpenImageUrl.src = src;
  popupOpenImageUrl.alt = title;
  popupOpenImageDescription.textContent = title;
  openPopUp(popupImage);
}


