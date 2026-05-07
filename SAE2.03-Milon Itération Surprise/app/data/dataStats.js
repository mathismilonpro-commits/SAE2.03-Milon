let HOST_URL = "https://mmi.unilim.fr/~milon3/SAE2.03-Milon%20It%C3%A9ration%20Surprise";

let DataStats = {};

DataStats.read = async function () {
    try {
        let answer = await fetch(HOST_URL + "/server/script.php?todo=readstats");
        if (!answer.ok) throw new Error("HTTP " + answer.status);
        return await answer.json();
    } catch (e) {
        console.warn("DataStats.read :", e);
        return null;
    }
};

export { DataStats };
