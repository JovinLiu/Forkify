import {searchRecipe, searchRecipeResults} from "./communicator";
import {RESULTS_PER_PAGE} from "./config";

export const state = {
  recipeOnShow: {},
  search: {searchResults: [], keyWord: "", page: 1, pageNum: "", resultsPerPage: RESULTS_PER_PAGE},
  bookMarks: []
};

export async function createRecipeOnShow(id) {
  try {
    const rawData = await searchRecipe(id);
    formatRecipeOnShow(rawData);
  } catch (err) {
    throw err;
  }
}

export function formatRecipeOnShow(data) {
  state.recipeOnShow = {
    cookingTime: data.data.recipe.cooking_time,
    id: data.data.recipe.id,
    imageUrl: data.data.recipe.image_url,
    ingredients: data.data.recipe.ingredients,
    publisher: data.data.recipe.publisher,
    servings: data.data.recipe.servings,
    sourceUrl: data.data.recipe.source_url,
    title: data.data.recipe.title,
    ...(data.data.recipe.key && {key: data.data.recipe.key})
  };
}

export async function createSearchResults() {
  try {
    const results = await searchRecipeResults();
    results.data.recipes.forEach((result) => {
      state.search.searchResults.push({
        id: result.id,
        publisher: result.publisher,
        title: result.title,
        imageUrl: result.image_url,
        ...(result.key && {key: result.key})
      });
    });
  } catch (err) {
    throw err;
  }
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

export function switchBookMark() {
  if (!state.bookMarks.some((recipe) => recipe.id === state.recipeOnShow.id)) {
    state.bookMarks.push(state.recipeOnShow);
  } else {
    const i = state.bookMarks.findIndex((recipe) => recipe.id === state.recipeOnShow.id);
    state.bookMarks.splice(i, 1);
  }
  storeLocalBookmarks();
}

function storeLocalBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookMarks));
}

export function loadLocalBookmarks() {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookMarks = JSON.parse(storage);
}

export function formatNewRecipe(rawNewRecipe) {
  const newRecipe = {
    ingredients: []
  };
  const arr = Object.entries(rawNewRecipe);
  arr.forEach((item) => {
    if (item[0].startsWith("ingredient")) {
      const ing = item[1].split(",");
      if (ing.length !== 3 && ing.length === 0) throw new Error("Wrong Ingredient Format! Please use the correct format!");
      if (!Boolean(ing[2]) || ing.length > 3) return;
      ing[0] = +ing[0] === 0 ? null : +ing[0];
      newRecipe.ingredients.push({quantity: ing[0], unit: ing[1], description: ing[2]});
    } else {
      newRecipe[item[0]] = item[1] > 0 ? +item[1] : item[1];
    }
  });
  return newRecipe;
}
