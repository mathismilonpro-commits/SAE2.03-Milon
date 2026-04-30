import { Movie } from "../Movie/script.js";

let templateFile = await fetch(
  "/~milon3/SAE2.03-Milon/app/component/MovieCategory/template.html",
);
let template = await templateFile.text();

let templateEmptyFile = await fetch(
  "/~milon3/SAE2.03-Milon/app/component/MovieCategory/template-empty.html",
);
let templateEmpty = await templateEmptyFile.text();

let MovieCategory = {};

MovieCategory.format = function (categoryName, movies) {
  let categoryHtml = template;
  categoryHtml = categoryHtml.replaceAll("{{category}}", categoryName);
  if (movies.length === 0) {
    categoryHtml = categoryHtml.replaceAll("{{movies}}", templateEmpty);
  } else {
    categoryHtml = categoryHtml.replaceAll("{{movies}}", Movie.format(movies));
  }
  return categoryHtml;
};

MovieCategory.attachWheelListeners = function () {
  let lists = document.querySelectorAll(".movie-category__list");
  let i = 0;
  while (i < lists.length) {
    lists[i].addEventListener("wheel", function (e) {
      e.preventDefault();
      this.scrollLeft += e.deltaY;
    }, { passive: false });
    i++;
  }
};

export { MovieCategory };
