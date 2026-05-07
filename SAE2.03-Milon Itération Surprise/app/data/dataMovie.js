let HOST_URL = "https://mmi.unilim.fr/~milon3/SAE2.03-Milon%20It%C3%A9ration%20Surprise";

let DataMovie = {};

DataMovie.requestMovies = async function () {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=readmovies");
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataMovie.requestMovies :", e);
        return [];
    }
}

DataMovie.requestMovieDetails = async function (id) {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=readmoviesDetail&id=" + id);
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataMovie.requestMovieDetails :", e);
        return null;
    }
}

DataMovie.requestMoviesGroupedByCategory = async function (age) {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=readmoviesgroupedbycategory&age=" + age);
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataMovie.requestMoviesGroupedByCategory :", e);
        return {};
    }
}

DataMovie.search = async function (keyword, age) {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=searchmovies&keyword=" + encodeURIComponent(keyword) + "&age=" + age);
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataMovie.search :", e);
        return [];
    }
}

export { DataMovie };
