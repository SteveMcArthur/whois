/*global require, module*/

var getJSON = require('./indent2Json').getJSON;


function getDomainObject(data) {

    var obj = getJSON(data,'','\s\s\s\s');
    
    var temp = {
        domainName: obj["Domain name"],
        creationDate: obj["Creation date"],
        updateDate: obj["Updated date"],
        expireDate: obj["Expiry date"],
        nameservers: obj["Name servers"],
        registrar: obj["Registrar"].join(", "),
        registrant: obj["Registrant"].join(", "),
        admin: {},
        tech: {}
    };
    
    var domainObj = require('./domainObj').get(temp);

    return {domainObj: domainObj, rawData: data};


}

module.exports.getDomainObject = getDomainObject;