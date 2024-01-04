import icons from "url:../../img/icons.svg";
import View from "./view";
import {state, getSearchResultsPerPage} from "../model";

class PaginationView extends View {
  parentElement = document.querySelector(".pagination");

  loadPagination(handler) {
    this.parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      state.search.page = +btn.dataset.goto;
      handler();
    });
  }

  generateHTML(page) {
    getSearchResultsPerPage();
    const pageMax = state.search.pageNum;
    if (page === 1 && pageMax > 1) {
      return this.generateBtnHTML(page + 1, page);
    }
    if (page > 1 && page < pageMax) {
      return this.generateBtnHTML(page - 1, page).concat(this.generateBtnHTML(page + 1, page));
    }
    if (page === pageMax && pageMax > 1) {
      return this.generateBtnHTML(page - 1, page);
    }
    return "";
  }

  generateBtnHTML(actionPage, page) {
    return `
            <button class="btn--inline pagination__btn--${actionPage < page ? "prev" : "next"}" data-goto="${actionPage < page ? page - 1 : page + 1}">
            <span>Page ${actionPage < page ? page - 1 : page + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-${actionPage < page ? "left" : "right"}"></use>
            </svg>
            </button>`;
  }
}

export default new PaginationView();
