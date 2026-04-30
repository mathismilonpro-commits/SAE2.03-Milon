let HOST_URL = "https://mmi.unilim.fr/~milon3/SAE2.03-Milon";

let DataFavorite = {};

DataFavorite.add = async function (userId, movieId) {
    let fdata = new FormData();
    fdata.append('user_id', userId);
    fdata.append('movie_id', movieId);
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "/server/script.php?todo=addfavorite", config);
    let data = await answer.json();
    return data;
};

DataFavorite.read = async function (userId) {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readfavorites&user_id=" + userId);
    let data = await answer.json();
    return data;
};

DataFavorite.remove = async function (userId, movieId) {
    let fdata = new FormData();
    fdata.append('user_id', userId);
    fdata.append('movie_id', movieId);
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "/server/script.php?todo=removefavorite", config);
    let data = await answer.json();
    return data;
};

export { DataFavorite };
