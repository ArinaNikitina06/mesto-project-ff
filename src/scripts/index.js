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
import { openPopUp, closePopUp, closePopupByEsc } from "../components/modal.js";

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

/* 

1. нужен механизм который захочет принять ссылку на какую то форму
2. в идеале правила правила валидации (объект) 

надо выделить функции:
- функция очистки всех ошибок
- функция блокирует кнопку
- функция разблокирует кнопку
- функция добавления ошибки

*/

// config
const configPopupEditForm = {
  selectors: {
    input: ".popup__input",
    spanError: ".popup__input-error",
    button: ".popup__button",
  },
  inputsRule: {
    name: {
      isRequired: true,
      between: {
        min: 2,
        max: 40,
      },
      isUrl: false,
      errorMessages: {
        isRequired: "поле обязательно для заполнения",
        between: "В поле «Имя» должно быть от 2 до 40 символов",
        isUrl: "«Ссылка на картинку» должен быть URL",
      },
    },
    description: {
      isRequired: true,
      between: {
        min: 2,
        max: 400,
      },
      isUrl: false,
      errorMessages: {
        isRequired: "поле обязательно для заполнения",
        between: "В поле «Описание» должно быть от 2 до 400 символов",
        isUrl: "Ссылка на картинку» должен быть URL",
      },
    },
  },
  buttonRule: {
    disabled: true,
  },
};
const configPopupCreateNewPlaceForm = {
  selectors: {
    input: ".popup__input",
    spanError: ".popup__input-error",
    button: ".popup__button",
  },
  inputsRule: {
    ["place-name"]: {
      isRequired: true,
      between: {
        min: 2,
        max: 30,
      },
      isUrl: false,
      errorMessages: {
        isRequired: "поле обязательно для заполнения",
        between: "В поле «Название» должно быть от 2 до 30 символов",
        isUrl: "«Ссылка на картинку» должен быть URL",
      },
    },
    link: {
      isRequired: true,
      between: {
        min: 2,
        max: 10000,
      },
      isUrl: true,
      errorMessages: {
        isRequired: "поле обязательно для заполнения",
        between: "В поле 'Ссылка на картинку' должно быть от 2 до 10000 символов",
        isUrl: "'Ссылка на картинку' должен быть URL",
      },
    },
  },
  buttonRule: {
    disabled: true,
  },
};

function enableValidation(form, config) {
  const inputsList = form.querySelectorAll(config.selectors.input);
  const currentBtn = form.querySelector(config.selectors.button);
  const spansList = form.querySelectorAll(config.selectors.spanError);

  inputsList.forEach((currentInput) => {
    const currentSpan = form.querySelector(
      `[data-name="form-input-error-${currentInput.name}"]`
    );

    currentInput.addEventListener("input", (e) => {
      const rulesCurrentInput = config.inputsRule[currentInput.name];

      // error isRequired
      if (
        rulesCurrentInput.isRequired === true &&
        currentInput.value.trim().length === 0
      ) {
        currentInput.classList.add("popup__input_type-error");
        currentSpan.classList.add("popup__input-error_active");
        currentSpan.textContent = rulesCurrentInput.errorMessages.isRequired;
        currentBtn.setAttribute("disabled", "disabled");
        return;
      }

      // error between
      if (
        currentInput.value.trim().length < rulesCurrentInput.between.min ||
        currentInput.value.trim().length > rulesCurrentInput.between.max
      ) {
        currentInput.classList.add("popup__input_type-error");
        currentSpan.classList.add("popup__input-error_active");
        currentSpan.textContent = rulesCurrentInput.errorMessages.between;
        currentBtn.setAttribute("disabled", "disabled");
        return;
      }

      if (
        (rulesCurrentInput.isUrl === true &&
          !currentInput.value.includes("http://")) &&
        !currentInput.value.includes("https://")
      ) {
        currentInput.classList.add("popup__input_type-error");
        currentSpan.classList.add("popup__input-error_active");
        currentSpan.textContent = rulesCurrentInput.errorMessages.isUrl;
        currentBtn.setAttribute("disabled", "disabled");
        return;
      }

      // success, clean error
        currentInput.classList.remove("popup__input_type-error");
        currentSpan.classList.remove("popup__input-error_active");
        currentSpan.textContent = "";
        currentBtn.removeAttribute("disabled");
    });
  });

  // function cleanAllErrors() {
  //   inputsList.forEach((currentInput) => {
  //     currentInput.classList.remove("popup__input_type-error");
  //   });

  //   spansList.forEach((currentSpan) => {
  //     currentSpan.classList.remove("popup__input-error_active");
  //   });
  //   currentBtn.removeAttribute("disabled");
  // }

  // return cleanAllErrors;
}

 function clearValidation(form, config) {
  const inputsList = form.querySelectorAll(config.selectors.input);
  const currentBtn = form.querySelector(config.selectors.button);
  const spansList = form.querySelectorAll(config.selectors.spanError);

  inputsList.forEach((currentInput) => {
      currentInput.classList.remove("popup__input_type-error");
    });

    spansList.forEach((currentSpan) => {
      currentSpan.classList.remove("popup__input-error_active");
    });
    currentBtn.removeAttribute("disabled");
 }



// popupEditProfileTitleInput.addEventListener('input', (e) => {
// const currentInput = e.target;
// const currentSpan = popupEditForm.querySelector(`[data-name="form-input-error-name"]`)
// const currentBtn = popupEditForm.querySelector(".popup__button");

// if(currentInput.value.length < 2 || currentInput.value.length > 40 ) {
//   currentInput.classList.add('popup__input_type-error')
//   currentSpan.classList.add('popup__input-error_active')
//   currentSpan.textContent = "В поле «Имя» должно быть от 2 до 40 символов.";
//   currentBtn.setAttribute('disabled','disabled')
// }

// if (currentInput.value.length === 0) {
//   currentInput.classList.add("popup__input_type-error");
//   currentSpan.classList.add("popup__input-error_active");
//   currentSpan.textContent = "Поле обязательное";
//   currentBtn.setAttribute("disabled", "disabled");
// }

// if (currentInput.value.length > 2 && currentInput.value.length < 40) {
//   currentInput.classList.remove("popup__input_type-error");
//   currentSpan.classList.remove("popup__input-error_active");
//   currentSpan.textContent = ""
//   currentBtn.removeAttribute("disabled");
// }

// // const result = currentInput.value.match(/[^a-zа-яё ]/iu);
// // console.log(result);

// })

enableValidation(popupEditForm, configPopupEditForm);
enableValidation(
  popupNewPlaceForm,
  configPopupCreateNewPlaceForm
);

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfileTitleInput.value = profileTitle.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;
  clearValidation(popupEditForm, configPopupEditForm);
  openPopUp(popupEdit);
});

popupPlaceOpenButton.addEventListener("click", () => {
  clearValidation(popupNewPlaceForm, configPopupCreateNewPlaceForm);
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
  const cardElement = createCard(
    { name, link },
    likeHandler,
    removeCardHandler,
    openCardHandler
  );
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
