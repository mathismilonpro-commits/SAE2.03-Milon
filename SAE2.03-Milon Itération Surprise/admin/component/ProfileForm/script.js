let templateFile = await fetch("./component/ProfileForm/template.html");
let template = await templateFile.text();

let templateOptionFile = await fetch("./component/ProfileForm/template-option.html");
let templateOption = await templateOptionFile.text();

let ProfileForm = {};

ProfileForm.format = function (handler, handlerSelect, profiles) {
  let options = "";
  let i = 0;
  while (i < profiles.length) {
    let p = profiles[i];
    let optionHtml = templateOption;
    optionHtml = optionHtml.replaceAll("{{id}}", p.id);
    optionHtml = optionHtml.replaceAll("{{nom}}", p.nom);
    optionHtml = optionHtml.replaceAll("{{image}}", p.image ?? "");
    optionHtml = optionHtml.replaceAll("{{restriction_age}}", p.restriction_age);
    options += optionHtml;
    i++;
  }

  let html = template;
  html = html.replaceAll("{{handler}}", handler);
  html = html.replaceAll("{{handlerSelect}}", handlerSelect);
  html = html.replaceAll("{{options}}", options);

  return html;
};

ProfileForm.prefill = function (select) {
  let form = select.closest("form");
  let option = select.options[select.selectedIndex];

  form.querySelector("[name='name']").value = option.dataset.name ?? "";
  form.querySelector("[name='image']").value = option.dataset.image ?? "";
  form.querySelector("[name='restriction_age']").value = option.dataset.age ?? "";
};

export { ProfileForm };
