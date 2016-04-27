/*global require, module*/

var getJSON = require('./lines2Json').getJSON;


function getDomainObject(data) {

    var obj = getJSON(data);
    
    var temp = {
        domainName: obj["Domain Name"],
        creationDate: obj["Registration Time"],
        updateDate: obj["Last Modified"],
        expireDate: obj["Expiration Time"],
        nameservers: obj["Name Server"],
        registrar: obj["Sponsoring Registrar"],
        registrant: obj["Registrant"],
        admin: {},
        tech: {}
    };
    
    var domainObj = require('./domainObj').get(temp);

    return {domainObj: domainObj, rawData: data};


}

module.exports = getDomainObject;