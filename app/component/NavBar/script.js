let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hAbout, hMovies, hProfile, profileLabel) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);
  html = html.replace("{{movies}}", hMovies);
  html = html.replace("{{hProfile}}", hProfile);
  html = html.replace("{{profileLabel}}", profileLabel || "Choisir un profil");
  return html;
};

export { NavBar };
