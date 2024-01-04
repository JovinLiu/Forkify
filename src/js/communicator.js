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
import {API_URL, FETCH_TIME_OUT, KEY} from "./config";
import {getKeyWord} from "./view/searchBarView";

function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}

export async function searchRecipe(id) {
  try {
    const request = fetch(`${API_URL}/${id}`);
    const res = await Promise.race([request, timeout(FETCH_TIME_OUT)]);
    if (!res.ok) throw new Error("Fail to fatch the information from API");
    const rawData = await res.json();
    return rawData;
  } catch (err) {
    throw err;
  }
}

export async function searchRecipeResults(newRecipe = undefined) {
  try {
    getKeyWord();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRecipe)
    };
    if (!state.search.keyWord && !newRecipe) throw new Error("Empty input! Please try a valid keyword! :)");
    const request = newRecipe ? fetch(`${API_URL}?key=${KEY}`, options) : fetch(`${API_URL}?search=${state.search.keyWord}&key=${KEY}`);
    const res = await Promise.race([request, timeout(FETCH_TIME_OUT)]);
    if (!res.ok) throw new Error("Fail to fatch the information from API");
    const results = await res.json();
    if (results.results === 0) throw new Error(`No recipes found. try another keyword for searching :)`);
    return results;
  } catch (err) {
    throw err;
  }
}

export async function deleteUserRecipe(id) {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await fetch(`${API_URL}/${id}?key=${KEY}`, options);
    console.log(res.ok);
  } catch (err) {
    console.log(err);
  }
}

export function deleteAllUserREcipes() {
  state.bookMarks.forEach((result) => {
    const id = result.id;
    deleteUserRecipe(id);
    window.history.pushState(null, "", `#`);
  });
}
