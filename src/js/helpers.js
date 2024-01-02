/**
 * About Forkify API
 * See API document: https://forkify-api.herokuapp.com/v2
 * Key for this application: KEY = 826c11a7-fa34-412a-b1fc-d3d2623e1239
 * To request a recipe list based on keywords: https://forkify-api.herokuapp.com/api/v2/recipes?search=<keywords>
 * To update user's recipe: https://forkify-api.herokuapp.com/api/v2/recipes&key=<insert your key>
 * To request a certain recipe based on id: https://forkify-api.herokuapp.com/api/v2/recipes/<id>
 * To delete a user's recipe bease on id: https://forkify-api.herokuapp.com/api/v2/recipes/<id>?key=<insert your key>
 */
// const id = `5ed6604591c37cdc054bc886`;
// const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes/`;
import {state} from "./model";
import {API_URL} from "./config";
import {getKeyWord} from "./view/searchBarView";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function searchRecipe(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Fail to fatch the information from API");
    const rawData = await res.json();
    return rawData;
  } catch (err) {
    console.error(err);
  }
}

export async function searchRecipeResults() {
  try {
    getKeyWord();
    const res = await fetch(`${API_URL}?search=${state.search.keyWord}`);
    if (!res.ok) throw new Error("Fail to fatch the information from API");
    const results = await res.json();
    return results;
  } catch (err) {
    console.error(err);
  }
}
