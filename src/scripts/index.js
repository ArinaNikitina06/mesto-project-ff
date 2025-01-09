// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import initialCards from "./cards.js";
import "../pages/index.css";

const placesList = document.querySelector(".places__list");
const popupProfileOpenButton = document.querySelector(".profile__edit-button")
const popupPlaceOpenButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupList = document.querySelectorAll(".popup");
// const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__close');

function openPopUp(popup) {
  document.addEventListener('keyup', closePopupByEsc)
  popup.classList.add("popup_is-opened");
}

function closePopUp(popup) {
  document.removeEventListener('keyup', closePopupByEsc)
  popup.classList.remove("popup_is-opened");
}

popupProfileOpenButton.addEventListener("click", () => {
  openPopUp(popupEdit);
});

popupPlaceOpenButton.addEventListener("click", () => {
  openPopUp(popupNewPlace);
});


popupList.forEach(popup => {
  popup.addEventListener("click", (e) => {
  if (e.target.closest(".popup__close")) {
    closePopUp(popup);
  }

  if (e.target === e.currentTarget) {
    closePopUp(popup);
  }
});
}); 

function closePopupByEsc(e){
    if (e.key === 'Escape') {
      const currentOpenPopup = document.querySelector('.popup_is-opened')
          closePopUp(currentOpenPopup);
    }
}


// popupProfileEditCloseBtn.addEventListener("click", () => {
//   closePopUp(popup)
// });

function createCards(initialCards) {
  initialCards.forEach((element) => {
    const cardElement = createCard(element);
    placesList.append(cardElement);
  });
}

createCards(initialCards);

function createCard({ name, link }) {
  const getTemplateCard = document
    .querySelector("#card-template")
    .content.querySelector(".card");

  const card = getTemplateCard.cloneNode(true);
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCard);
  return card;
}

function removeCard(event) {
  event.target.closest(".card").remove();
}
