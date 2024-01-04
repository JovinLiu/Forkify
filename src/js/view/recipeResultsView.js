import {generateHTML} from "./previewView";
import View from "./view";

class RecipeResultsView extends View {
  parentElement = document.querySelector(".results");
  searchBtn = document.querySelector(".search__btn");

  loadRecipeResults(handler) {
    this.searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }

  generateHTML(data) {
    return generateHTML(data);
  }
}

export default new RecipeResultsView();
