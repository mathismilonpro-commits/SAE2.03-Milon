let templateFile = await fetch("./component/ProfileSelector/template.html");
let template = await templateFile.text();

let ProfileSelector = {};

ProfileSelector.format = function (profiles) {
  let cards = "";

  let i = 0;
  while (i < profiles.length) {
    let p = profiles[i];
    let cardHtml = template;

    cardHtml = cardHtml.replaceAll("{{id}}", p.id);
    cardHtml = cardHtml.replaceAll("{{nom}}", p.nom);
    cardHtml = cardHtml.replaceAll("{{restriction_age}}", p.restriction_age);
    let imageHtml = p.image
      ? `<img class="profile-card__image" src="/~milon3/SAE2.03-Milon/server/images/${p.image}" alt="${p.nom}">`
      : "";
    cardHtml = cardHtml.replaceAll("{{image}}", imageHtml);

    cards += cardHtml;
    i++;
  }

  let html = '<h2 class="profile-selector__title">Qui regarde ?</h2>';
  html += `<div class="profile-selector__list flex-context flex-center gap-m">${cards}</div>`;

  return html;
};

export { ProfileSelector };
