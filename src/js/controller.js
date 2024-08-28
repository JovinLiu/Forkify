import recipeView from "./view/recipeView";
import recipeResultsView from "./view/recipeResultsView";
import {state, createRecipeOnShow, createSearchResults, getSearchResultsPerPage, updateIngredients, switchBookMark, formatNewRecipe, formatRecipeOnShow, loadLocalBookmarks, cleanBookmarks} from "./model";
import paginationView from "./view/paginationView";
import bookMarkView from "./view/bookMarkView";
import uploadRecipeView from "./view/uploadRecipeView";
import {searchRecipeResults} from "./communicator";
import {AUTO_CLOSE_WINDOW_SEC} from "./config";
import {deleteAllUserREcipes} from "./communicator";

(function init() {
  loadLocalBookmarks();
  recipeView.loadRecipe(controlRecipeView);
  recipeResultsView.loadRecipeResults(controlRecipeResultsView);
  paginationView.loadPagination(controlPagination);
  recipeView.loadNewServings(controlNewServings);
  recipeView.controlBookMark(controlBookMarkView);
  uploadRecipeView.uploadRecipe(controlUploadRecipe);
  // deleteAllUserREcipes();
  // cleanBookmarks();
})();

async function controlRecipeView() {
  try {
    state.bookMarks.length === 0 ? bookMarkView.renderError("empty") : bookMarkView.render(state.bookMarks);
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.addLoadingSpinner();
    await createRecipeOnShow(id);
    updateIngredients();
    recipeResultsView.update(getSearchResultsPerPage());
    recipeView.render(state);
  } catch (err) {
    recipeView.renderError(err);
  }
}

async function controlRecipeResultsView() {
  try {
    state.search.searchResults = [];
    recipeResultsView.addLoadingSpinner();
    await createSearchResults();
    controlPagination();
  } catch (err) {
    paginationView.cleanContainer();
    recipeResultsView.renderError(err);
  }
}

function controlPagination() {
  recipeResultsView.render(getSearchResultsPerPage());
  paginationView.render(state.search.page);
}

function controlNewServings(goTo) {
  updateIngredients(goTo);
  recipeView.update(state);
}

function controlBookMarkView() {
  switchBookMark();
  state.bookMarks.length === 0 ? bookMarkView.renderError("empty") : bookMarkView.render(state.bookMarks);
  recipeView.update(state);
}

async function controlUploadRecipe(rawNewRecipe) {
  try {
    uploadRecipeView.addLoadingSpinner();
    const newRecipe = formatNewRecipe(rawNewRecipe);
    const result = await searchRecipeResults(newRecipe);
    formatRecipeOnShow(result);
    switchBookMark();
    window.history.pushState(null, "", `#${state.recipeOnShow.id}`);
    recipeView.render(state);
    bookMarkView.render(state.bookMarks);
    uploadRecipeView.renderMessage();
    setTimeout(function () {
      if (!Array.from(uploadRecipeView.addRecipeWindow.classList).includes("hidden")) {
        uploadRecipeView.toggleWindow();
      }
      setTimeout(() => {
        uploadRecipeView.render();
      }, 1000);
    }, AUTO_CLOSE_WINDOW_SEC * 1000);
  } catch (err) {
    uploadRecipeView.renderError(err);
  }
}
