import icons from "url:../../img/icons.svg";
import View from "./view";

class UploadRecipeView extends View {
  parentElement = document.querySelector(".upload");
  addRecipeWindow = document.querySelector(".add-recipe-window");
  overlay = document.querySelector(".overlay");
  btnOpen = document.querySelector(".nav__btn--add-recipe");
  btnClose = document.querySelector(".btn--close-modal");
  btnUpload = document.querySelector(".upload__btn");
  message = "Recipe was successfully uploaded!";

  constructor() {
    super();
    this.showWindow();
    this.closeWindow();
  }

  showWindow() {
    this.btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  closeWindow() {
    this.btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this.overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  toggleWindow() {
    this.addRecipeWindow.classList.toggle("hidden");
    this.overlay.classList.toggle("hidden");
  }

  autoCloseWindow() {
    if (!Array.from(this.addRecipeWindow.classList).includes("hidden")) {
      setTimeout(() => this.toggleWindow(), 3000);
    }
  }

  uploadRecipe(handler) {
    this.btnUpload.addEventListener("click", function (e) {
      e.preventDefault();
      const form = document.querySelector(".upload");
      const data = new FormData(form);
      let rawNewRecipe = {};
      for (let [key, value] of data) {
        rawNewRecipe[key] = value;
      }
      handler(rawNewRecipe);
    });
  }
}

export default new UploadRecipeView();
