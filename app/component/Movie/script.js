let templateFile = await fetch(
  "/~milon3/SAE2.03-Milon/app/component/Movie/template.html",
);
let template = await templateFile.text();

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

export { Movie };
