// const configPopupEditForm = {
//   selectors: {
//     input: ".popup__input",
//     spanError: ".popup__input-error",
//     button: ".popup__button",
//   },
//   inputsRule: {
//     name: {
//       isRequired: true,
//       between: {
//         min: 2,
//         max: 40,
//       },
//       isUrl: false,
//       errorMessages: {
//         isRequired: "поле обязательно для заполнения",
//         between: "В поле «Имя» должно быть от 2 до 40 символов",
//         isUrl: "«Ссылка на картинку» должен быть URL",
//       },
//     },
//     description: {
//       isRequired: true,
//       between: {
//         min: 2,
//         max: 400,
//       },
//       isUrl: false,
//       errorMessages: {
//         isRequired: "поле обязательно для заполнения",
//         between: "В поле «Описание» должно быть от 2 до 400 символов",
//         isUrl: "Ссылка на картинку» должен быть URL",
//       },
//     },
//   },
//   buttonRule: {
//     disabled: true,
//   },
//   formRule:{
// reset: false
//   }
// };

// const configPopupCreateNewPlaceForm = {
//   selectors: {
//     input: ".popup__input",
//     spanError: ".popup__input-error",
//     button: ".popup__button",
//   },
//   inputsRule: {
//     ["place-name"]: {
//       isRequired: true,
//       between: {
//         min: 2,
//         max: 30,
//       },
//       isUrl: false,
//       errorMessages: {
//         isRequired: "поле обязательно для заполнения",
//         between: "В поле «Название» должно быть от 2 до 30 символов",
//         isUrl: "«Ссылка на картинку» должен быть URL",
//       },
//     },
//     link: {
//       isRequired: true,
//       between: {
//         min: 2,
//         max: 10000,
//       },
//       isUrl: true,
//       errorMessages: {
//         isRequired: "поле обязательно для заполнения",
//         between:
//           "В поле 'Ссылка на картинку' должно быть от 2 до 10000 символов",
//         isUrl: "'Ссылка на картинку' должен быть URL",
//       },
//     },
//   },
//   buttonRule: {
//     disabled: true,
//   },
//   formRule: {
//     reset: true,
//   },
// };

// const configPopupEditAvatarForm = {
//   selectors: {
//     input: ".popup__input",
//     spanError: ".popup__input-error",
//     button: ".popup__button",
//   },
//   inputsRule: {
//     ["new-avatar"]: {
//       isRequired: true,
//       between: {
//         min: 2,
//         max: 10000,
//       },
//       isUrl: true,
//       errorMessages: {
//         isRequired: "поле обязательно для заполнения",
//         between:
//           "В поле 'Ссылка на картинку' должно быть от 2 до 10000 символов",
//         isUrl: "'Ссылка на картинку' должен быть URL",
//       },
//     },
//   },
//   buttonRule: {
//     disabled: true,
//   },
//   formRule: {
//     reset: true,
//   },
// };

// function showInputError(form, currentInput, currentSpan, errorMessage) {
//   currentInput.classList.add("popup__input_type-error");
//   currentSpan.classList.add("popup__input-error_active");
//   currentSpan.textContent = errorMessage;
// };

// function hideInputError(form, currentInput, currentSpan) {
//    currentInput.classList.remove("popup__input_type-error");
//    currentSpan.classList.remove("popup__input-error_active");
//    currentSpan.textContent = "";
// };

// function toggleButtonState(inputList, currentBtn) {
//   if(){
// disabledBtn(currentBtn)
//   } else{
//     enabledBtn(currentBtn)
//   }
// }

// function disabledBtn(currentBtn) {
//  currentBtn.disabled = true;
// }

// function enabledBtn(currentBtn) {
//   currentBtn.disabled = false;
// }

// function enableValidation(form, config) {
//   const inputsList = form.querySelectorAll(config.selectors.input);
//   const currentBtn = form.querySelector(config.selectors.button);
//   const spansList = form.querySelectorAll(config.selectors.spanError);

//   const state = {
//     inputsStatus: {},
//   };

//   inputsList.forEach((currentInput) => {
//     const currentSpan = form.querySelector(
//       `[data-name="form-input-error-${currentInput.name}"]`
//     );

//     if (currentInput.value.trim().length === 0) {
//       state.inputsStatus[currentInput.name] = false;
//     } else {
//       state.inputsStatus[currentInput.name] = true;
//     }

//     currentInput.addEventListener("input", (e) => {
//       const rulesCurrentInput = config.inputsRule[currentInput.name];

//       if (
//         rulesCurrentInput.isRequired === true &&
//         currentInput.value.trim().length === 0
//       ) {

//         showInputError(form, currentInput, currentSpan, rulesCurrentInput.errorMessages.isRequired)
//         currentBtn.setAttribute("disabled", "disabled");
//         state.inputsStatus[currentInput.name] = true;
//         return;
//       }

//       if (
//         currentInput.value.trim().length < rulesCurrentInput.between.min ||
//         currentInput.value.trim().length > rulesCurrentInput.between.max
//       ) {

//           showInputError(
//             form,
//             currentInput,
//             currentSpan,
//             rulesCurrentInput.errorMessages.between
//           );
//         currentBtn.setAttribute("disabled", "disabled");
//         return;
//       }

//       if (
//         rulesCurrentInput.isUrl === true &&
//         !currentInput.value.includes("http://") &&
//         !currentInput.value.includes("https://")
//       ) {

//           showInputError(
//             form,
//             currentInput,
//             currentSpan,
//             rulesCurrentInput.errorMessages.isUrl
//           );
//         currentBtn.setAttribute("disabled", "disabled");
//         return;
//       }

//       // success, clean error
//       hideInputError(form, currentInput, currentSpan)
//       currentBtn.removeAttribute("disabled");
//       state.inputsStatus[currentInput.name] = true;

//       if (Object.values(state.inputsStatus).includes(false)) {
//         console.log("нашли какой то пустой");
//         currentBtn.setAttribute("disabled", "disabled");
//       }
//     });
//   });

//   // ------------------
//   if (!Object.values(state.inputsStatus).includes(true)) {
//     console.log("все пустые блокируем кнопку", state.inputsStatus);
//     currentBtn.setAttribute("disabled", "disabled");
//   }
//   // console.log(Object.values(state.inputsStatus));
// }

// function clearValidation(form, config) {
//   const inputsList = form.querySelectorAll(config.selectors.input);
//   const currentBtn = form.querySelector(config.selectors.button);
//   const spansList = form.querySelectorAll(config.selectors.spanError);

//   inputsList.forEach((currentInput) => {
//     currentInput.classList.remove("popup__input_type-error");
//   });

//   spansList.forEach((currentSpan) => {
//     currentSpan.classList.remove("popup__input-error_active");
//   });

//   if (config.formRule.reset) {
//     form.reset();
//   }

//   currentBtn.removeAttribute("disabled");
// }

// export {
//   configPopupEditForm,
//   configPopupCreateNewPlaceForm,
//   configPopupEditAvatarForm,
//   enableValidation,
//   clearValidation,
// };

function validator(form, config) {
  const inputList = [...form.querySelectorAll(config.input)];
  const btn = form.querySelector(config.button);

  function init() {
    form.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners();
    toggleButtonState();
  }
  init();

  function setEventListeners() {
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input);
        toggleButtonState();
      });
    });
  }

  function checkInputValidity(input) {
    if (input.validity.valid) {
      hideInputError(input);
    } else {
      showInputError(input);
    }
  }

  function hasInvalidInput() {
    return inputList.some((input) => !input.validity.valid);
  }

  function toggleButtonState() {
    if (hasInvalidInput()) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  }

  function showInputError(input) {
    const span = form.querySelector(
      `[data-name="form-input-error-${input.name}"]`
    );
    span.classList.add("popup__input-error_active");
    input.classList.add("popup__input_type-error");
    span.textContent = input.validationMessage;
  }

  function hideInputError(input) {
    const span = form.querySelector(
      `[data-name="form-input-error-${input.name}"]`
    );
    span.classList.remove("popup__input-error_active");
    input.classList.remove("popup__input_type-error");
    span.textContent = "";
  }
}

function clearValidation(form, config) {
  const inputList = form.querySelectorAll(config.input);
  const spanList = form.querySelectorAll(config.spanError);

  inputList.forEach((input) =>
    input.classList.remove("popup__input_type-error")
  );

  spanList.forEach((span) => {
    span.classList.remove("popup__input-error_active");
    span.textContent = "";
  });
}

export { validator, clearValidation };
