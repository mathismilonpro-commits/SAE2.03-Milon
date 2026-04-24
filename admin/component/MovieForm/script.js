let templateFile = await fetch("./component/MovieForm/template.html");
let template = await templateFile.text();

let MovieForm = {};

MovieForm.format = function (handler) {
  let html = template;
  html = html.replaceAll("{{handler}}", handler);

  return html;
};

// Template pour une option HTML
let optionTemplate = '<option value="{{value}}">{{label}}</option>';

MovieForm.getOption = function(value, label) {
  let html = optionTemplate;
  html = html.replaceAll("{{value}}", value);
  html = html.replaceAll("{{label}}", label);
  return html;
};

// Fonction pour charger les catégories et remplir le select
MovieForm.loadCategories = async function() {
  try {
    // Récupère les catégories depuis l'API
    let response = await fetch("../server/script.php?todo=readcategories");
    let categories = await response.json();
    
    // Génère les options HTML
    let optionsHtml = categories.map(category => 
      MovieForm.getOption(category.name, category.name)
    ).join('');
    
    let selectElement = document.getElementById("categorie");
    if (selectElement) {
      selectElement.innerHTML = optionsHtml;
    }
  } catch (error) {
    console.error("Erreur lors du chargement des catégories:", error);
  }
};

// Fonction pour charger les restrictions d'âge et remplir le select
MovieForm.loadMinAges = function() {
  const minAges = [0, 6, 10, 12, 14, 16, 18];
  
  let optionsHtml = minAges.map(age => 
    MovieForm.getOption(age, age + " ans")
  ).join('');
  
  let selectElement = document.getElementById("min_age");
  if (selectElement) {
    selectElement.innerHTML = optionsHtml;
  }
};

export { MovieForm };