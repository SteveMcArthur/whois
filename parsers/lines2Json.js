/*global require, module*/
var toLines = require('./toLines');
var obj = {};
var lastProp = "";
var indent = "";
var indent2 = "";
//indent is either a space or a tab (not just any whitespace)
var indentReg = new RegExp(/^( +|\t+)/);

function normaliseProperty(prop){
    prop = prop.trim().toLowerCase();
    //remove trailing colon
    prop = prop.replace(/\:\s?$/, '');
    //remove spaces, slashes and apostrophes
    prop = prop.replace(/[\s\/\\']/g, '');
    return prop;
}

function setIndent(lines) {
    var result = "";
    var i = 0;

    //determine indent from first 5 lines
    //.uk files usually begin with an empty line
    //then all data is indented by 4 spaces and sub properties 8 spaces.
    //.ca files have no empty line, so no initial indent and sub properties 4 spaces.
    while ((result === "") && (i < 5)) {
        var m = indentReg.exec(lines[i]);
        if (m) {
            result = m[0];
        }
        i++;
    }
    indent = result;
    indent2 = indent + indent;
}

function indentLineToProperty(line) {
    if (line.substr(0, indent2.length) === indent2) {
        var val = line.trim();
        obj[lastProp].push(val);
    } else {
        lastProp = normaliseProperty(line);
        obj[lastProp] = [];
    }
}

function lineToProperty(line) {
    var i = line.indexOf(":");
    var prop = line.substr(0, i);
    prop = normaliseProperty(prop);
    var val = line.substr(i + 1, line.length).trim();
    if (!obj[prop]) {
        obj[prop] = [];
    }
    obj[prop].push(val);
}

function getJSON(data,indentFormat) {

    var lineFn = lineToProperty;
    var lines = toLines(data);
    if(indentFormat){
        lineFn = indentLineToProperty;
        setIndent(lines);
    }

    lines.forEach(lineFn);

    if (obj.registrarregistrationexpirationdate) {
        obj.expiredate = obj.registrarregistrationexpirationdate;
        delete obj.registrarregistrationexpirationdate;
    }
    if (obj.nameservers) {
        obj.nameserver = obj.nameservers;
        delete obj.nameservers;
    }

    if (obj.registrarabusecontactphone) {
        obj.registrarphone = obj.registrarabusecontactphone;
        delete obj.registrarabusecontactphone;
        obj.registraremail = obj.registrarabusecontactemail;
        delete obj.registrarabusecontactemail;
    }

    if (!obj.updateddate && obj.lastmodified) {
        obj.updateddate = obj.lastmodified;
    }


    return obj;

}

module.exports.getJSON = getJSON;