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

  /* 
  
  TODO:
  - owner это мы, там есть наш _id
  - likes это массив всех кто поставил лайки, в каждом объекте есть _id
  надо найти нас среди бъектов likes, если мы там есть то добавлять закрашенный лайк
  
  
  */
  // console.log('11111', owner);
  // console.log("22222", likes);

  function isLike() {
    const result = likes.find((like) => like._id === "682ca4b77ab2895ed6ba31ec");

    if (result) {
      return true;
    }

    return false;
  }



  if (owner._id === "682ca4b77ab2895ed6ba31ec") {
    card
      .querySelector(".card__delete-button")
      .addEventListener("click", removeCardHandler);
  } else {
    card.querySelector(".card__delete-button").remove();
  }

  card
    .querySelector(".card__like-button")
    .addEventListener("click", likeHandler);
  cardImg.addEventListener("click", () =>
    openCardHandler(cardImg.src, cardTitle.textContent)
  );
  card.querySelector(".card__likes-counter").textContent = likes.length;

  if (isLike()) {
    card
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  } else {
    card
      .querySelector(".card__like-button")
      .classList.remove("card__like-button_is-active");
  }

  return card;
}

// function removeCardHandler(event) {
//   event.target.closest(".card").remove();
// }

// export {createCard, removeCardHandler, likeHandler};
export { createCard };
