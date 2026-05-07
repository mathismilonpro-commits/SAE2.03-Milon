let templateFile = await fetch("./component/ProfileSelector/template.html");
let template = await templateFile.text();

let templateAvatarImgFile = await fetch("./component/ProfileSelector/template-avatar-img.html");
let templateAvatarImg = await templateAvatarImgFile.text();

let templateAvatarLetterFile = await fetch("./component/ProfileSelector/template-avatar-letter.html");
let templateAvatarLetter = await templateAvatarLetterFile.text();

let templateListFile = await fetch("./component/ProfileSelector/template-list.html");
let templateList = await templateListFile.text();

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

    let avatarHtml;
    if (p.image) {
      avatarHtml = templateAvatarImg;
      avatarHtml = avatarHtml.replaceAll("{{image}}", p.image);
      avatarHtml = avatarHtml.replaceAll("{{nom}}", p.nom);
    } else {
      avatarHtml = templateAvatarLetter;
      avatarHtml = avatarHtml.replaceAll("{{letter}}", p.nom.charAt(0).toUpperCase());
    }
    cardHtml = cardHtml.replaceAll("{{avatar}}", avatarHtml);

    cards += cardHtml;
    i++;
  }

  let html = templateList;
  html = html.replaceAll("{{cards}}", cards);

  return html;
};

export { ProfileSelector };
