let HOST_URL = "..";

let DataProfile = {};

DataProfile.read = async function () {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readprofile");
    let data = await answer.json();
    return data;
}

export {DataProfile};