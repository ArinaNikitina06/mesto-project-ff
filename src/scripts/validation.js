
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
      hideInputError(input, config);
    } else {
      showInputError(input,config);
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

  function showInputError(input,config) {
    const span = form.querySelector(
      `[data-name="form-input-error-${input.name}"]`
    );
    span.classList.add(config.spanErrorActive);
    input.classList.add(config.inputErrorActive);
    span.textContent = input.validationMessage;
  }

  function hideInputError(input, config) {
    const span = form.querySelector(
      `[data-name="form-input-error-${input.name}"]`
    );
    span.classList.remove(config.spanErrorActive);
    input.classList.remove(config.inputErrorActive);
    span.textContent = "";
  }
}

function clearValidation(form, config) {
  const inputList = form.querySelectorAll(config.input);
  const spanList = form.querySelectorAll(config.spanError);

  inputList.forEach((input) => input.classList.remove(config.inputErrorActive));

  spanList.forEach((span) => {
    span.classList.remove(config.spanErrorActive);
    span.textContent = "";
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.form);
  forms.forEach((form) => validator(form, config));
}

export { clearValidation, enableValidation };
