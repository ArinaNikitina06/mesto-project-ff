// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import initialCards from "./cards.js";
import "../pages/index.css";

const placesList = document.querySelector(".places__list");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupPlaceOpenButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupList = document.querySelectorAll(".popup");
// const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__close');

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

function openPopUp(popup) {
  document.addEventListener("keyup", closePopupByEsc);
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
}

function closePopUp(popup) {
  document.removeEventListener("keyup", closePopupByEsc);
  popup.classList.remove("popup_is-opened");
    popup.classList.add("popup_is-animated");
}

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
  const cardElement = createCard({ name, link });
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

function closePopupByEsc(e) {
  if (e.key === "Escape") {
    const currentOpenPopup = document.querySelector(".popup_is-opened");
    closePopUp(currentOpenPopup);
  }
}

// popupProfileEditCloseBtn.addEventListener("click", () => {
//   closePopUp(popup)
// });

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

function createCard({ name, link }, likeHandler, removeCardHandler, openCardHandler) {
  const getTemplateCard = document
    .querySelector("#card-template")
    .content.querySelector(".card");

  const card = getTemplateCard.cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = name;
  const cardImg = card.querySelector(".card__image");
  cardImg.src = link;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCardHandler);
  card
    .querySelector(".card__like-button")
    .addEventListener("click", likeHandler);
  cardImg.addEventListener("click", () => openCardHandler(cardImg.src, cardTitle.textContent));
  return card;
}

function openCardHandler(src, title) {
  popupOpenImageUrl.src = src;
  popupOpenImageUrl.alt = title;
  popupOpenImageDescription.textContent = title;
  openPopUp(popupImage);
}

function removeCardHandler(event) {
  event.target.closest(".card").remove();
}

function likeHandler(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
