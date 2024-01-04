import icons from "url:../../img/icons.svg";
import {generateHTML} from "./previewView";
import View from "./view";
import {state} from "../model";

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
    console.log(data);
    console.log(state);
    return generateHTML(data);
  }
}

export default new RecipeResultsView();
