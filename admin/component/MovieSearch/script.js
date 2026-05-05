let templateFile = await fetch("/~milon3/SAE2.03-Milon/admin/component/MovieSearch/template.html");
let template = await templateFile.text();

let templateResultFile = await fetch("/~milon3/SAE2.03-Milon/admin/component/MovieSearch/template-result.html");
let templateResult = await templateResultFile.text();

let MovieSearch = {};

MovieSearch.format = function (hSearch) {
    return template.replace("{{hSearch}}", hSearch);
};

MovieSearch.formatResults = function (movies) {
    if (movies.length === 0) {
        return '<p class="movie-search__empty">Aucun film ne correspond à votre recherche.</p>';
    }
    let html = '';
    let i = 0;
    while (i < movies.length) {
        let m = movies[i];
        let isFeatured = m.mis_en_avant == 1;
        let row = templateResult;
        row = row.replaceAll("{{name}}", m.name);
        row = row.replaceAll("{{category}}", m.category);
        row = row.replace("{{toggleClass}}", isFeatured ? "movie-search__toggle--on" : "movie-search__toggle--off");
        row = row.replace("{{toggleLabel}}", isFeatured ? "★ En avant" : "☆ Mettre en avant");
        row = row.replace("{{hToggle}}", `C.handlerToggleFeatured(${m.id}, ${isFeatured ? 0 : 1})`);
        html += row;
        i++;
    }
    return html;
};

export { MovieSearch };
