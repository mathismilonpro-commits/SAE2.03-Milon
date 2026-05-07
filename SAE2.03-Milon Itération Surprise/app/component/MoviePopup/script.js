let templateFile = await fetch("./component/MoviePopup/template.html");
let template = await templateFile.text();

let MoviePopup = {};

MoviePopup.format = function (movie) {
  let html = template;
  html = html.replaceAll("{{image}}",       movie.image       ?? "");
  html = html.replaceAll("{{name}}",        movie.name        ?? "");
  html = html.replaceAll("{{year}}",        movie.year        ?? "");
  html = html.replaceAll("{{length}}",      movie.length      ?? "");
  html = html.replaceAll("{{category}}",    movie.category    ?? "");
  html = html.replaceAll("{{description}}", movie.description ?? "");
  html = html.replaceAll("{{id}}",          movie.id          ?? "");
  return html;
};

export { MoviePopup };
