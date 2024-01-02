import icons from "url:../../img/icons.svg";

export default class View {
  data;
  cleanContainer() {
    this.parentElement.innerHTML = "";
  }

  addLoadingSpinner() {
    const html = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
    this.cleanContainer();
    this.parentElement.insertAdjacentHTML("afterbegin", html);
  }

  render(data) {
    this.cleanContainer();
    this.parentElement.insertAdjacentHTML("afterbegin", this.generateHTML(data));
  }

  update(data) {
    const oldDomArr = Array.from(this.parentElement.querySelectorAll("*"));
    const newDomArr = Array.from(document.createRange().createContextualFragment(this.generateHTML(data)).querySelectorAll("*"));
    newDomArr.forEach((newEl, i) => {
      const oldEl = oldDomArr[i];
      if (!newEl.isEqualNode(oldEl) && newEl.firstChild?.nodeValue.trim() !== "") oldEl.textContent = newEl.textContent;
      if (!newEl.isEqualNode(oldEl)) Array.from(newEl.attributes).forEach((attr) => oldEl.setAttribute(attr.name, attr.value));
    });
  }
}
