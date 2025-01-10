function openPopUp(popup) {
  document.addEventListener("keyup", closePopupByEsc);
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
}

function closePopUp(popup) {
  document.removeEventListener("keyup", closePopupByEsc);
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
}

function closePopupByEsc(e) {
  if (e.key === "Escape") {
    const currentOpenPopup = document.querySelector(".popup_is-opened");
    closePopUp(currentOpenPopup);
  }
}
export { openPopUp, closePopUp, closePopupByEsc };