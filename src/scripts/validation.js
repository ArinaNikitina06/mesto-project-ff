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

export {configPopupEditForm, configPopupCreateNewPlaceForm, enableValidation, clearValidation}