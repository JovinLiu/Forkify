import icons from "url:../../img/icons.svg";
import fracty from "fracty";
import View from "./view";

class RecipeView extends View {
  //NOTE:recipeContainer
  parentElement = document.querySelector(".recipe");
  id = window.location.hash.slice(1);
  error = "No recipes found. Please have another try:)";

  loadNewServings(handler) {
    this.parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      if (goTo > 0) handler(goTo);
    });
  }

  loadRecipe(handler) {
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, handler));
  }

  controlBookMark(handler) {
    this.parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--round");
      if (!btn) return;
      handler();
    });
  }

  generateHTML(data) {
    return `
                      <figure class="recipe__fig">
                        <img src=${data.recipeOnShow.imageUrl} alt="Tomato" class="recipe__img" />
                        <h1 class="recipe__title">
                          <span>${data.recipeOnShow.title}</span>
                        </h1>
                      </figure>
      
                      <div class="recipe__details">
                        <div class="recipe__info">
                          <svg class="recipe__info-icon">
                            <use href="${icons}#icon-clock"></use>
                          </svg>
                          <span class="recipe__info-data recipe__info-data--minutes">${data.recipeOnShow.cookingTime}</span>
                          <span class="recipe__info-text">minutes</span>
                        </div>
                        <div class="recipe__info">
                          <svg class="recipe__info-icon">
                            <use href="${icons}#icon-users"></use>
                          </svg>
                          <span class="recipe__info-data recipe__info-data--people">${data.recipeOnShow.servings}</span>
                          <span class="recipe__info-text">servings</span>
      
                          <div class="recipe__info-buttons">
                            <button data-goto="${+data.recipeOnShow.servings - 1}" class="btn--tiny btn--decrease-servings">
                              <svg>
                                <use href="${icons}#icon-minus-circle"></use>
                              </svg>
                            </button>
                            <button data-goto="${+data.recipeOnShow.servings + 1}" class="btn--tiny btn--increase-servings">
                              <svg>
                                <use href="${icons}#icon-plus-circle"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
      
                        <div class="recipe__user-generated">
                          <svg>
                            ${data.recipeOnShow.key ? `<use href="${icons}#icon-user"></use>` : ""}
                          </svg>
                        </div>
                        <button class="btn--round">
                          <svg class="">
                            <use href="${icons}#icon-bookmark${data.bookMarks.some((markedRcp) => markedRcp.id === data.recipeOnShow.id) ? "-fill" : ""}"></use>
                          </svg>
                        </button>
                      </div>
      
                      <div class="recipe__ingredients">
                        <h2 class="heading--2">Recipe ingredients</h2>
                        <ul class="recipe__ingredient-list">
                        ${data.recipeOnShow.ingredients.map((ing) => this.generateIngredientHtml(ing)).join("")}
                        </ul>
                      </div>
      
                      <div class="recipe__directions">
                        <h2 class="heading--2">How to cook it</h2>
                        <p class="recipe__directions-text">
                          This recipe was carefully designed and tested by
                          <span class="recipe__publisher">${data.recipeOnShow.publisher}</span>. Please check out
                          directions at their website.
                        </p>
                        <a
                          class="btn--small recipe__btn"
                          href=${data.recipeOnShow.sourceUrl}
                          target="_blank"
                        >
                          <span>Directions</span>
                          <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                          </svg>
                        </a>
                      </div>
      `;
  }

  generateIngredientHtml(ing) {
    return ` 
                  <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                      <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity ? fracty(ing.quantity).toString() : ""}</div>
                    <div class="recipe__description">
                      <span class="recipe__unit">${ing.unit}</span>
                      ${ing.description}
                    </div>
                  </li>`;
  }
}

export default new RecipeView();
//
