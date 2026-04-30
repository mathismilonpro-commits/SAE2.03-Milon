let templateFile = await fetch("./component/MovieForm/template.html");
let template = await templateFile.text();

let templateOptionFile = await fetch("./component/MovieForm/template-option.html");
let templateOption = await templateOptionFile.text();

let MovieForm = {};

MovieForm.format = function (handler) {
  let html = template;
  html = html.replaceAll("{{handler}}", handler);
  return html;
};

MovieForm.getOption = function (value, label) {
  let html = templateOption;
  html = html.replaceAll("{{value}}", value);
  html = html.replaceAll("{{label}}", label);
  return html;
};

MovieForm.loadCategories = async function () {
  try {
    let response = await fetch("../server/script.php?todo=readcategories");
    let categories = await response.json();

    let optionsHtml = "";
    for (let category of categories) {
      optionsHtml += MovieForm.getOption(category.name, category.name);
    }

    let selectElement = document.getElementById("categorie");
    if (selectElement) {
      selectElement.innerHTML = optionsHtml;
    }
  } catch (error) {
    console.error("Erreur lors du chargement des catégories:", error);
  }
};

MovieForm.loadMinAges = function () {
  const minAges = [0, 6, 10, 12, 14, 16, 18];

  let optionsHtml = "";
  for (let age of minAges) {
    optionsHtml += MovieForm.getOption(age, age + " ans");
  }

  let selectElement = document.getElementById("min_age");
  if (selectElement) {
    selectElement.innerHTML = optionsHtml;
  }
};

export { MovieForm };
