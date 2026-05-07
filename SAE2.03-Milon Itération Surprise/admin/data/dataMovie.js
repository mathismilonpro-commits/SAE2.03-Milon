let HOST_URL = "https://mmi.unilim.fr/~milon3/SAE2.03-Milon%20It%C3%A9ration%20Surprise";

let DataMovie = {};

DataMovie.add = async function (fdata) {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=add", { method: "POST", body: fdata });
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataMovie.add :", e);
    }
}

DataMovie.search = async function (keyword) {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=searchmovies&keyword=" + encodeURIComponent(keyword));
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataMovie.search :", e);
        return [];
    }
}

DataMovie.updateFeatured = async function (id, status) {
    try {
        let fdata = new FormData();
        fdata.append('id', id);
        fdata.append('status', status);
        let answer = await fetch(HOST_URL + "/server/script.php?todo=updatefeatured", { method: "POST", body: fdata });
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataMovie.updateFeatured :", e);
    }
}

export { DataMovie };
