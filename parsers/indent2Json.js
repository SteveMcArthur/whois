/*global require, module*/
var toLines = require('./toLines');
var indentReg = new RegExp(/^( +|\t+)/);

function getIndent(lines) {

    var result = "";
    var i = 0;

    while ((result === "") && (i < 5)) {
        var m = indentReg.exec(lines[i]);
        if (m) {
            result = m[0];
        }
        i++;
    }
    return result;
}

function getJSON(data,indent,indent2) {

    var lines = toLines(data);
    
    indent = indent || getIndent(lines);
    indent2 = indent2 || (indent + indent);
    var obj = {};
    var lastProp = "";
    lines.forEach(function (line) {
        if (line.substr(0, indent2.length) === indent2) {
            var val = line.trim();
            obj[lastProp].push(val);
        } else {
            lastProp = line.trim();
            lastProp = lastProp.replace(/\:\s?$/, '').replace(/'/, '');
            //remove spaces and slashes
            lastProp = lastProp.toLowerCase().replace(/[\s\/\\]/g,'');
            obj[lastProp] = [];
        }
    });

    return obj;
}

module.exports.getJSON = getJSON;