let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hAbout, hMovies) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);
  html = html.replace("{{movies}}", hMovies);
  return html;
};

export { NavBar };
