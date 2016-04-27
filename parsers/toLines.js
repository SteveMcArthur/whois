/*global module*/
var lineReg = new RegExp(/(\r?\n)/g);

function toLines(data) {
    var temp = data.split(lineReg);
    var lines = [];
    temp.forEach(function (line) {
        if ((line.length > 0) && (line !== '\r\n')) {
            lines.push(line);
        }
    });
    return lines;
}

module.exports = toLines;