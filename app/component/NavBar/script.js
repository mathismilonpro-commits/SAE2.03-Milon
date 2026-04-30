let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hAbout, hMovies, hProfile, profileLabel, hFavorites, hStats) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);
  html = html.replace("{{movies}}", hMovies);
  html = html.replace("{{hProfile}}", hProfile);
  html = html.replace("{{profileLabel}}", profileLabel || "Choisir un profil");
  html = html.replace("{{hFavorites}}", hFavorites || "");
  html = html.replace("{{hStats}}", hStats || "");
  return html;
};

export { NavBar };
