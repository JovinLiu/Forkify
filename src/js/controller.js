import icons from "url:../img/icons.svg";
const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const id = `5ed6604591c37cdc054bc886`;
const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes/`;

const state = {recipeOnShow: {}, searchResults: [], bookmarks: {}};

async function AJAX(id) {
  try {
    const res = await fetch(`${API_URL}${id}`);
    if (!res.ok) throw new Error("Fail to fatch the information from API");
    const rawData = await res.json();
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
    console.log(state);
    addLoadingSpinner();
    recipeContainer.insertAdjacentHTML("afterbegin", generateHTML());
    const ingredientsContainer = document.querySelector(".recipe__ingredient-list");
    ingredientsContainer.insertAdjacentHTML("beforeend", generateIngredientHtml());
    // console.log(generateHTML());
    // console.log(generateIngredientHtml());
  } catch (err) {
    console.error(err);
  }
}

AJAX(id);

function cleanContainer() {
  recipeContainer.innerHTML = "";
}

function addLoadingSpinner() {
  const html = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
  cleanContainer();
  recipeContainer.insertAdjacentHTML("afterbegin", html);
}

function generateHTML() {
  cleanContainer();
  const html = `
                <figure class="recipe__fig">
                  <img src=${state.recipeOnShow.imageUrl} alt="Tomato" class="recipe__img" />
                  <h1 class="recipe__title">
                    <span>${state.recipeOnShow.title}</span>
                  </h1>
                </figure>

                <div class="recipe__details">
                  <div class="recipe__info">
                    <svg class="recipe__info-icon">
                      <use href="${icons}#icon-clock"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${state.recipeOnShow.cookingTime}</span>
                    <span class="recipe__info-text">minutes</span>
                  </div>
                  <div class="recipe__info">
                    <svg class="recipe__info-icon">
                      <use href="${icons}#icon-users"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${state.recipeOnShow.servings}</span>
                    <span class="recipe__info-text">servings</span>

                    <div class="recipe__info-buttons">
                      <button class="btn--tiny btn--increase-servings">
                        <svg>
                          <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                      </button>
                      <button class="btn--tiny btn--increase-servings">
                        <svg>
                          <use href="${icons}#icon-plus-circle"></use>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="recipe__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>
                  <button class="btn--round">
                    <svg class="">
                      <use href="${icons}#icon-bookmark-fill"></use>
                    </svg>
                  </button>
                </div>

                <div class="recipe__ingredients">
                  <h2 class="heading--2">Recipe ingredients</h2>
                  <ul class="recipe__ingredient-list">

                  </ul>
                </div>

                <div class="recipe__directions">
                  <h2 class="heading--2">How to cook it</h2>
                  <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__publisher">${state.recipeOnShow.publisher}</span>. Please check out
                    directions at their website.
                  </p>
                  <a
                    class="btn--small recipe__btn"
                    href=${state.recipeOnShow.sourceUrl}
                    target="_blank"
                  >
                    <span>Directions</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                  </a>
                </div>
`;
  return html;
}

function generateIngredientHtml() {
  console.log(state.recipeOnShow.ingredients);
  const ingsHtml = state.recipeOnShow.ingredients
    .map((ing) => {
      return ` 
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing.quantity}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                  </div>
                </li>`;
    })
    .join("");

  return ingsHtml;
}

const searchBtn = document.querySelector(".search__btn");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Ok");
});

async function searchResults() {
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`);
    if (!res.ok) throw new Error("Fail to fatch the information from API");
    const results = await res.json();
    results.data.recipes.forEach((result) => {
      state.searchResults.push({
        id: result.id,
        publisher: result.publisher,
        title: result.title,
        imageUrl: result.image_url
      });
    });
    console.log(state.searchResults);
    const searchResultsContainer = document.querySelector(".results");
    searchResultsContainer.insertAdjacentHTML("afterbegin", generateHTML2());
  } catch (err) {
    console.error(err);
  }
}

searchResults();

function generateHTML2() {
  const html = state.searchResults
    .map((result) => {
      return ` 
          <li class="preview">
            <a class="preview__link preview__link--active" href="${result.id}">
              <figure class="preview__fig">
                <img src="${result.imageUrl}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
    })
    .join("");
  return html;
}
