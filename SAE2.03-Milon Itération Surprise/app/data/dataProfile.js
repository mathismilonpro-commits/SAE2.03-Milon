let HOST_URL = "https://mmi.unilim.fr/~milon3/SAE2.03-Milon%20It%C3%A9ration%20Surprise";

let DataProfile = {};

DataProfile.read = async function () {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=readprofile");
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        let data = await answer.json();
        return data;
    } catch (e) {
        console.warn("DataProfile.read :", e);
        return [];
    }
}

export {DataProfile};
