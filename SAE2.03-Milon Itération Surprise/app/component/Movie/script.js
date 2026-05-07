let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let templateHeroFile = await fetch("./component/Movie/template-hero.html");
let templateHero = await templateHeroFile.text();

let templateFeaturedCardFile = await fetch("./component/Movie/template-featured-card.html");
let templateFeaturedCard = await templateFeaturedCardFile.text();

let Movie = {};

/**
 * Movie.format
 * Formate un ou plusieurs films pour affichage
 * @param {Array|Object} movies - Un film (objet) ou un tableau de films
 * @returns {string} HTML formaté
 */
Movie.format = function (movies) {
  if (!Array.isArray(movies)) {
    movies = [movies];
  }

  let html = "";

  let i = 0;
  while (i < movies.length) {
    let movie = movies[i];
    let movieHtml = template;

    movieHtml = movieHtml.replaceAll("{{id}}", movie.id);
    movieHtml = movieHtml.replaceAll("{{name}}", movie.name);
    movieHtml = movieHtml.replaceAll("{{image}}", movie.image);

    html += movieHtml;
    i++;
  }

  return html;
};

Movie.formatHero = function (movie) {
  let isFavorite = window.C?.activeFavorites?.has(movie.id) ?? false;
  let html = templateHero;
  html = html.replaceAll("{{id}}", movie.id ?? "");
  html = html.replaceAll("{{name}}", movie.name ?? "");
  html = html.replaceAll("{{image}}", movie.image ?? "");
  html = html.replaceAll("{{year}}", movie.year ?? "");
  html = html.replaceAll("{{length}}", movie.length ?? "");
  html = html.replaceAll("{{description}}", movie.description ?? "");
  html = html.replaceAll("{{trailer}}", movie.trailer ?? "");
  html = html.replaceAll("{{director}}", movie.director ?? "");
  html = html.replaceAll("{{category}}", movie.category ?? "");
  html = html.replaceAll("{{min_age}}", movie.min_age ?? "");
  html = html.replaceAll("{{favoriteChecked}}", isFavorite ? "checked" : "");
  return html;
};

Movie.formatFeaturedCards = function (movies) {
  if (!Array.isArray(movies)) movies = [movies];
  let html = "";
  let i = 0;
  while (i < movies.length) {
    let movie = movies[i];
    let movieHtml = templateFeaturedCard;
    movieHtml = movieHtml.replaceAll("{{id}}", movie.id);
    movieHtml = movieHtml.replaceAll("{{name}}", movie.name);
    movieHtml = movieHtml.replaceAll("{{image}}", movie.image);
    html += movieHtml;
    i++;
  }
  return html;
};

export { Movie };
