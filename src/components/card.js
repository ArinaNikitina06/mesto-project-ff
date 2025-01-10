function createCard(
  { name, link },
  likeHandler,
  removeCardHandler,
  openCardHandler
) {
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
  cardImg.addEventListener("click", () =>
    openCardHandler(cardImg.src, cardTitle.textContent)
  );
  return card;
}

function removeCardHandler(event) {
  event.target.closest(".card").remove();
}

function likeHandler(event) {
  event.target.classList.toggle("card__like-button_is-active");}

export {createCard, removeCardHandler, likeHandler};