let templateFile = await fetch("./component/ProfileForm/template.html");
let template = await templateFile.text();

let ProfileForm = {};

ProfileForm.format = function (handler, handlerSelect, profiles) {
  let options = "";
  let i = 0;
  while (i < profiles.length) {
    let p = profiles[i];
    options += `<option value="${p.id}" data-name="${p.nom}" data-image="${p.image ?? ""}" data-age="${p.restriction_age}">${p.nom}</option>`;
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

  form.querySelector("[name='name']").value = option.dataset.name  ?? "";
  form.querySelector("[name='image']").value = option.dataset.image ?? "";
  form.querySelector("[name='restriction_age']").value = option.dataset.age ?? "";
};

export { ProfileForm };
