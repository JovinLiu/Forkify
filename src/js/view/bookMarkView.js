import View from "./view";
import {generateHTML} from "./previewView";

class BookMarkView extends View {
  parentElement = document.querySelector(".bookmarks__list");
  error = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  generateHTML(data) {
    return generateHTML(data);
  }
}

export default new BookMarkView();
