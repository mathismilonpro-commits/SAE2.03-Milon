let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hAbout, hMovies, hProfile, profileLabel, hFavorites, hStats) {
  let html = template;
  html = html.replaceAll("{{hAbout}}", hAbout);
  html = html.replaceAll("{{movies}}", hMovies);
  html = html.replaceAll("{{hProfile}}", hProfile);
  html = html.replaceAll("{{profileLabel}}", profileLabel || "Choisir un profil");
  html = html.replaceAll("{{hFavorites}}", hFavorites || "");
  html = html.replaceAll("{{hStats}}", hStats || "");
  return html;
};

export { NavBar };
