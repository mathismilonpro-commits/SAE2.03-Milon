let templateFile = await fetch("/~milon3/SAE2.03-Milon/app/component/Stats/template.html");
let template = await templateFile.text();

let templateCardFile = await fetch("/~milon3/SAE2.03-Milon/app/component/Stats/template-card.html");
let templateCard = await templateCardFile.text();

let Stats = {};

Stats.formatCard = function (label, value) {
  let html = templateCard;
  html = html.replaceAll("{{label}}", label);
  html = html.replaceAll("{{value}}", value);
  return html;
};

Stats.format = function (data) {
  let cards = "";
  cards += Stats.formatCard("Profils créés", data.total_profiles);
  cards += Stats.formatCard("Films au catalogue", data.total_movies);
  cards += Stats.formatCard("Favoris moyens par profil", data.avg_favorites);
  cards += Stats.formatCard("Film le plus mis en favori", data.most_favorited_movie);
  cards += Stats.formatCard("Catégorie la plus populaire", data.most_popular_category);

  let html = template;
  html = html.replaceAll("{{cards}}", cards);
  return html;
};

export { Stats };
