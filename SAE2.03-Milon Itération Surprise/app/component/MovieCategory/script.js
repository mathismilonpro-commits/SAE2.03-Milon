import { Movie } from "../Movie/script.js";

let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();

let templateEmptyFile = await fetch("./component/MovieCategory/template-empty.html");
let templateEmpty = await templateEmptyFile.text();

let templateFeaturedFile = await fetch("./component/MovieCategory/template-featured.html");
let templateFeatured = await templateFeaturedFile.text();

let MovieCategory = {};

MovieCategory.format = function (categoryName, movies) {
  if (categoryName === "À la une" && movies.length > 0) {
    let html = templateFeatured;
    html = html.replaceAll("{{heroMovie}}", Movie.formatHero(movies[0]));
    html = html.replaceAll("{{movies}}", Movie.formatFeaturedCards(movies));
    return html;
  }

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
  let isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  if (!isDesktop) {
    let lists = document.querySelectorAll(".movie-category__list");
    let i = 0;
    while (i < lists.length) {
      let list = lists[i];
      if (list.dataset.wheelBound) { i++; continue; }
      list.dataset.wheelBound = "true";
      list.addEventListener("wheel", function (e) {
        e.preventDefault();
        this.scrollLeft += e.deltaY;
      }, { passive: false });
      i++;
    }
  } else {
    let carousels = document.querySelectorAll(".movie-category__carousel");
    let j = 0;
    while (j < carousels.length) {
      let carousel = carousels[j];
      if (carousel.dataset.arrowBound) { j++; continue; }
      carousel.dataset.arrowBound = "true";

      let list = carousel.querySelector(".movie-category__list");
      let prevBtn = carousel.querySelector(".movie-category__arrow--prev");
      let nextBtn = carousel.querySelector(".movie-category__arrow--next");

      if (!list || !prevBtn || !nextBtn) { j++; continue; }

      list.addEventListener("scroll", function () {
        prevBtn.disabled = list.scrollLeft <= 0;
        nextBtn.disabled = list.scrollLeft >= list.scrollWidth - list.clientWidth - 1;
      }, { passive: true });

      prevBtn.addEventListener("click", function () {
        list.scrollBy({ left: -(list.clientWidth * 0.75) });
      });

      nextBtn.addEventListener("click", function () {
        list.scrollBy({ left: list.clientWidth * 0.75 });
      });

      j++;
    }
  }
};

export { MovieCategory };
