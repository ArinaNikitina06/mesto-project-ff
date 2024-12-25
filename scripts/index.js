// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");

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
return card
}

function removeCard(event) {
  event.target.closest(".card").remove();
}