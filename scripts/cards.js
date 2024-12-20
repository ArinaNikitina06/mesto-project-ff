const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const placesList = document.querySelector(".places__list");


function createCards(initialCards) {
  initialCards.forEach((element) => createCard(element));
}

createCards(initialCards);

function createCard({ name, link }) {
  const getTemplateCard = document
    .querySelector("#card-template")
    .content.querySelector(".card");
    
  const card = getTemplateCard.cloneNode(true);
  card.querySelector(".card__title").textContent = name
  card.querySelector(".card__image").src = link
card.querySelector(".card__delete-button").addEventListener('click', removeCard)
  

  placesList.insertAdjacentElement('beforeend', card)
}

function removeCard(event){
  event.target.closest(".card").remove()
}
