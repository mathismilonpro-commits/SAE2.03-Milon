let templateFile = await fetch('./component/Form/index.html');
let template = await templateFile.text();

let Form = {};

// — Interne au module —

let lookupMenu = async function() {
    let semaine = document.querySelector('#semaine');
    let jour = document.querySelector('#jour');

    let response = await fetch("../server/script.php?jour=" + jour.value + "&semaine=" + semaine.value);
    let data = await response.json();

    if (data.length > 0) {
        return data[0];
    } else {
        return { entree: "Soon...", plat: "Soon...", dessert: "Soon..." };
    }
}

let updateForm = function(menu) {
    let input_entree  = document.querySelector('input[name="entree"]');
    let input_plat    = document.querySelector('input[name="plat"]');
    let input_dessert = document.querySelector('input[name="dessert"]');

    input_entree.value  = menu.entree;
    input_plat.value    = menu.plat;
    input_dessert.value = menu.dessert;
}

// — API publique —

Form.load = async function() {
    let menu = await lookupMenu();
    updateForm(menu);
}

export { Form };