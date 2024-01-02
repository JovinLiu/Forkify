import {searchRecipe, searchRecipeResults} from "./helpers";
import {Fraction} from "fractional";
import {RESULTS_PER_PAGE} from "./config";

export const state = {
  recipeOnShow: {},
  search: {searchResults: [], keyWord: "", page: 1, pageNum: "", resultsPerPage: RESULTS_PER_PAGE},
  bookmarks: {}
};

export async function createRecipeOnShow(id) {
  const rawData = await searchRecipe(id);
  state.recipeOnShow = {
    cookingTime: rawData.data.recipe.cooking_time,
    id: rawData.data.recipe.id,
    imageUrl: rawData.data.recipe.image_url,
    ingredients: rawData.data.recipe.ingredients,
    publisher: rawData.data.recipe.publisher,
    servings: rawData.data.recipe.servings,
    sourceUrl: rawData.data.recipe.source_url,
    title: rawData.data.recipe.title
  };
}

export async function createSearchResults() {
  const results = await searchRecipeResults();
  results.data.recipes.forEach((result) => {
    state.search.searchResults.push({
      id: result.id,
      publisher: result.publisher,
      title: result.title,
      imageUrl: result.image_url
    });
  });
}

export function getSearchResultsPerPage() {
  const page = +state.search.page;
  const resultsPerPage = state.search.resultsPerPage;
  state.search.pageNum = Math.ceil(state.search.searchResults.length / resultsPerPage);
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  return state.search.searchResults.slice(start, end);
}

export function updateIngredients(goTo = state.recipeOnShow.servings) {
  state.recipeOnShow.ingredients.forEach((ing) => (ing.quantity = (ing.quantity / state.recipeOnShow.servings) * goTo));
  state.recipeOnShow.servings = goTo;
}
