let templateFile = await fetch("./component/Error/template.html");
let template = await templateFile.text();

let Notif = {};

Notif.show = function (message) {
  let content = document.querySelector("#error");
  content.innerHTML = template.replaceAll("{{message}}", message);

  let popup = content.querySelector(".error-popup");
  popup.classList.add("error-popup--visible");

  let closeButton = content.querySelector(".error-popup__close");
  closeButton.addEventListener("click", function () {
    popup.classList.remove("error-popup--visible");
  });
};

Notif.hide = function () {
  let content = document.querySelector("#error");
  content.innerHTML = "";
};

export { Notif };
