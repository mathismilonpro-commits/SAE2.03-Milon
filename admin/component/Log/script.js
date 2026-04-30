let templateFile = await fetch('./component/Log/template.html');
let template = await templateFile.text();

let templateLiFile = await fetch('./component/Log/template-li.html');
let templateLi = await templateLiFile.text();

let templateLiLastFile = await fetch('./component/Log/template-li-last.html');
let templateLiLast = await templateLiLastFile.text();

let Log = {};

let history = [];

let add = function(txt){
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let time = h + ':' + m + ':' + s;
    let log = {time: time, txt: txt};
    history.push(log);
};

let formatHistory = function(){
    let html = "";
    if (history.length == 0) return html;
    for (let i = 0; i < history.length - 1; i++){
        let log = history[i];
        html += templateLi.replace('{{time}}', log.time).replace('{{txt}}', log.txt);
    }
    let lastLog = history[history.length - 1];
    html += templateLiLast.replace('{{time}}', lastLog.time).replace('{{txt}}', lastLog.txt);
    return html;
};

Log.format = function(txt){
    add(txt);
    let html = template;
    html = html.replace("{{logs}}", formatHistory());
    return html;
};

export { Log };
