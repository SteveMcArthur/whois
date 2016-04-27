/*global require, module*/
var getJSON = require('./parseCOM');

var months = {
    Jan: 0,
    Feb: 1,
    Mar: 3,
    April: 4,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sept: 9,
    Nov: 10,
    Dec: 11
};


function getDate(str) {
    var dstr = str.split(":")[1].trim();
    var dt = dstr.split("-");
    if (dt.length > 2) {
        return new Date(parseInt(dt[2]),months[dt[1]],parseInt(dt[0]));
    } else {
        return dstr;
    }

}


function getDomainObject(data) {

    var obj = getJSON(data, true);
    var domainObj = obj.domainObj;
    var rawObj = obj.rawObj;

    domainObj.creationDate = getDate(rawObj.relevantdates[0]);
    domainObj.updateDate = getDate(rawObj.relevantdates[2]);
    domainObj.expireDate = getDate(rawObj.relevantdates[1]);
    domainObj.registrar.name = rawObj.registrar.join(", ");
    domainObj.registrant.name = rawObj.registrant.join(", ");
    domainObj.registrant.address = rawObj.registrantsaddress;

    obj.domainObj = domainObj;

    return obj;
}

module.exports = getDomainObject;