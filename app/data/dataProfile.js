let HOST_URL = "https://mmi.unilim.fr/~milon3/SAE2.03-Milon";

let DataProfile = {};

DataProfile.read = async function () {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readprofile");
    let data = await answer.json();
    return data;
}

export {DataProfile};