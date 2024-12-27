// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import initialCards from "./cards.js";
import "../pages/index.css";

const placesList = document.querySelector(".places__list");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup");
const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__close');

popupProfileOpenButton.addEventListener('click', () => {
popupProfileEdit.classList.add("popup_is-opened");
})

popupProfileEditCloseBtn.addEventListener("click", () => {
  popupProfileEdit.classList.remove("popup_is-opened");
});

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

