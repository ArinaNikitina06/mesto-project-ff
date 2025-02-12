function createCard(
  { name, link, likes, owner },
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

  if(owner._id === "682ca4b77ab2895ed6ba31ec"){
    card
      .querySelector(".card__delete-button")
      .addEventListener("click", removeCardHandler);
  } else {
     card .querySelector(".card__delete-button").remove()
  }

  card
    .querySelector(".card__like-button")
    .addEventListener("click", likeHandler);
  cardImg.addEventListener("click", () =>
    openCardHandler(cardImg.src, cardTitle.textContent)
  );
  card.querySelector(".card__likes-counter").textContent = likes.length 
  return card;
}

// function removeCardHandler(event) {
//   event.target.closest(".card").remove();
// }



// export {createCard, removeCardHandler, likeHandler};
export {createCard};
