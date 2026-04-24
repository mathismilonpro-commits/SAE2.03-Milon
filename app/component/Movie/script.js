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
  // Gère le cas où un seul film est passé
  if (!Array.isArray(movies)) {
    movies = [movies];
  }

  let html = "";

  movies.forEach((movie) => {
    let movieHtml = template;

    movieHtml = movieHtml.replaceAll("{{id}}", movie.id);
    movieHtml = movieHtml.replaceAll("{{name}}", movie.name);
    movieHtml = movieHtml.replaceAll("{{image}}", movie.image);

    html += movieHtml;
  });

  return html;
};

export { Movie };
