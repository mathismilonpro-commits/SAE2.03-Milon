let HOST_URL = "https://mmi.unilim.fr/~milon3/SAE2.03-Milon%20It%C3%A9ration%20Surprise";

let DataFavorite = {};

DataFavorite.add = async function (userId, movieId) {
    try {
        let fdata = new FormData();
        fdata.append('user_id', userId);
        fdata.append('movie_id', movieId);
        let answer = await fetch(HOST_URL + "/server/script.php?todo=addfavorite", { method: "POST", body: fdata });
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataFavorite.add :", e);
    }
};

DataFavorite.read = async function (userId) {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=readfavorites&user_id=" + userId);
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataFavorite.read :", e);
        return [];
    }
};

DataFavorite.remove = async function (userId, movieId) {
    try {
        let fdata = new FormData();
        fdata.append('user_id', userId);
        fdata.append('movie_id', movieId);
        let answer = await fetch(HOST_URL + "/server/script.php?todo=removefavorite", { method: "POST", body: fdata });
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataFavorite.remove :", e);
    }
};

export { DataFavorite };
