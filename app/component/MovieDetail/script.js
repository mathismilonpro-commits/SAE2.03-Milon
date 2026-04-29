let templateFile = await fetch("./component/MovieDetail/template.html");
let template = await templateFile.text();

let MovieDetail = {};

/**
 * MovieDetail.format
 * Formate un film pour affichage en détail
 * @param {Object} movie - Les détails du film
 * @returns {string} HTML formaté
 */
MovieDetail.format = function (movie, handlerFavorite, isFavorite) {
  let html = template;

  html = html.replaceAll("{{name}}", movie.name);
  html = html.replaceAll("{{director}}", movie.director);
  html = html.replaceAll("{{year}}", movie.year);
  html = html.replaceAll("{{length}}", movie.length);
  html = html.replaceAll("{{category}}", movie.category);
  html = html.replaceAll("{{image}}", movie.image);
  html = html.replaceAll("{{description}}", movie.description);
  html = html.replaceAll("{{trailer}}", movie.trailer);
  html = html.replaceAll("{{min_age}}", movie.min_age);
  html = html.replaceAll("{{handlerFavorite}}", handlerFavorite ?? "");
  html = html.replaceAll("{{favoriteChecked}}", isFavorite ? "checked" : "");

  return html;
};

export { MovieDetail };
