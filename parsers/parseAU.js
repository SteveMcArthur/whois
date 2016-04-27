/*global require, module*/

var getJSON = require('./parseCOM');


function getDomainObject(data) {

    var obj = getJSON(data);
    var domainObj = obj.domainObj;
    var rawObj = obj.rawObj;


    domainObj.registrar.name = rawObj.registrarname[0];
    domainObj.registrant.name = rawObj.registrant[0];
    domainObj.registrant.email = rawObj.registrantcontactemail[0];
    domainObj.tech.name = rawObj.techcontactname[0];
    domainObj.tech.email = rawObj.techcontactemail[0];


    return {
        rawObj: rawObj,
        domainObj: domainObj,
        rawData: obj.rawData
    };


}

module.exports = getDomainObject;