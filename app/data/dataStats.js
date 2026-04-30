let HOST_URL = "https://mmi.unilim.fr/~milon3/SAE2.03-Milon";

let DataStats = {};

DataStats.read = async function () {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readstats");
    let data = await answer.json();
    return data;
};

export { DataStats };
