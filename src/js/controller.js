import icons from "url:../img/icons.svg";
import recipeView from "./view/recipeView";
import recipeResultsView from "./view/recipeResultsView";
import {state, createRecipeOnShow, createSearchResults, getSearchResultsPerPage, updateIngredients} from "./model";
import paginationView from "./view/paginationView";

(function init() {
  recipeView.loadRecipe(controlRecipeView);
  recipeResultsView.loadRecipeResults(controlRecipeResultsView);
  paginationView.loadPagination(controlPagination);
  recipeView.loadNewServings(controlNewServings);
})();

async function controlRecipeView() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  recipeView.addLoadingSpinner();
  await createRecipeOnShow(id);
  updateIngredients();
  recipeResultsView.update(getSearchResultsPerPage());
  recipeView.render(state.recipeOnShow);
}

async function controlRecipeResultsView() {
  recipeResultsView.addLoadingSpinner();
  await createSearchResults();
  controlPagination();
}

function controlPagination() {
  recipeResultsView.render(getSearchResultsPerPage());
  paginationView.render(state.search.page);
}

function controlNewServings(goTo) {
  updateIngredients(goTo);
  recipeView.update(state.recipeOnShow);
}
