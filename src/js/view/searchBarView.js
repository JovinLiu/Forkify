import {state} from "../model";

export function getKeyWord() {
  state.search.keyWord = document.querySelector(".search__field").value;
  document.querySelector(".search__field").value = "";
}
