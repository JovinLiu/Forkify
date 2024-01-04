import icons from "url:../../img/icons.svg";

export function generateHTML(data) {
  const id = window.location.hash.slice(1);
  console.log(data);
  return data
    .map((result) => {
      return ` 
            <li class="preview">
              <a class="preview__link ${result.id === id ? "preview__link--active" : ""}" href="#${result.id}">
                <figure class="preview__fig">
                  <img src="${result.imageUrl}" alt="Test" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${result.title}</h4>
                  <p class="preview__publisher">${result.publisher}</p>
                  ${
                    result.key
                      ? `<div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>`
                      : ""
                  }
                </div>
              </a>
            </li>`;
    })
    .join("");
}
