import icons from "url:../../img/icons.svg";
import View from "./view";

class UploadRecipeView extends View {
  parentElement = document.querySelector(".upload");
  addRecipeWindow = document.querySelector(".add-recipe-window");
  overlay = document.querySelector(".overlay");
  btnOpen = document.querySelector(".nav__btn--add-recipe");
  btnClose = document.querySelector(".btn--close-modal");
  btnUpload = document.querySelector(".upload__btn");
  form = document.querySelector(".upload");
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

  uploadRecipe(handler) {
    this.btnUpload.addEventListener("click", function (e) {
      e.preventDefault();
      const data = new FormData(this.form);
      let rawNewRecipe = {};
      for (let [key, value] of data) {
        rawNewRecipe[key] = value;
      }
      handler(rawNewRecipe);
    });
  }

  generateHTML() {
    return `        
              <div class="upload__column">
                <h3 class="upload__heading">Recipe data</h3>
                <label>Title</label>
                <input value="TEST123" required name="title" type="text" />
                <label>URL</label>
                <input value="TEST123" required name="source_url" type="text" />
                <label>Image URL</label>
                <input value="TEST123" required name="image_url" type="text" />
                <label>Publisher</label>
                <input value="TEST123" required name="publisher" type="text" />
                <label>Prep time</label>
                <input value="10" required name="cooking_time" type="number" />
                <label>Servings</label>
                <input value="4" required name="servings" type="number" />
              </div>

              <div class="upload__column">
                <h3 class="upload__heading">Ingredients</h3>
                <label>Ingredient 1</label>
                <input value="0.5,kg,Rice" type="text" required name="ingredient-1" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 2</label>
                <input value="1,,Avocado" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 3</label>
                <input value=",,salt" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 4</label>
                <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 5</label>
                <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 6</label>
                <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
              </div>

              <button class="btn upload__btn">
                <svg>
                  <use href="${icons}#icon-upload-cloud"></use>
                </svg>
                <span>Upload</span>
              </button>`;
  }
}

export default new UploadRecipeView();
