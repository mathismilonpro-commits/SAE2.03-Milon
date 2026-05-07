let HOST_URL = "https://mmi.unilim.fr/~milon3/SAE2.03-Milon%20It%C3%A9ration%20Surprise";

let DataProfile = {};

DataProfile.read = async function () {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=readprofile");
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataProfile.read :", e);
        return [];
    }
}

DataProfile.addProfile = async function (fdata) {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=addprofile", { method: "POST", body: fdata });
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataProfile.addProfile :", e);
    }
}

DataProfile.updateProfile = async function (fdata) {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=updateprofile", { method: "POST", body: fdata });
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataProfile.updateProfile :", e);
    }
}

export { DataProfile };
