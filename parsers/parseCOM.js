/*global require, module*/
var getJSON = require('./lines2Json').getJSON;

//if a property doesn't exist then return null rather
//than throwing an error by trying to access index 0
function firstItem(prop){
    return (prop && Array.isArray(prop)) ? prop[0] : null;
}

function getDate(prop){
    var dt = firstItem(prop);
    if(dt){
        return new Date(dt);
    }else {
        return null;
    }

}

function getDomainObject(data,indentFormat) {

    var obj = getJSON(data,indentFormat);

    var domainObj = {
        domainName: firstItem(obj.domainname),
        creationDate: getDate(obj.creationdate),
        updateDate: getDate(obj.updateddate),
        expireDate: getDate(obj.expiredate),
        dnssec: firstItem(obj.dnssec),
        nameservers: obj.nameserver,
        registrar: {
            name: firstItem(obj.registrar),
            phone: firstItem(obj.registrarphone),
            email: firstItem(obj.registraremail)
        },
        registrant: {
            name: firstItem(obj.registrantname),
            organization: firstItem(obj.registrantorganization),
            street: firstItem(obj.registrantstreet),
            city: firstItem(obj.registrantcity),
            state: firstItem(obj.registrantstateprovince),
            postcode: firstItem(obj.registrantpostalcode),
            country: firstItem(obj.registrantcountry),
            phone: firstItem(obj.registrantphone),
            fax: firstItem(obj.registrantfax),
            email: firstItem(obj.registrantemail)
        },
        admin: {
            name: firstItem(obj.adminname),
            organization: firstItem(obj.adminorganization),
            street: firstItem(obj.adminstreet),
            city: firstItem(obj.admincity),
            state: firstItem(obj.adminstateprovince),
            postcode: firstItem(obj.adminpostalcode),
            country: firstItem(obj.admincountry),
            phone: firstItem(obj.adminphone),
            fax: firstItem(obj.adminfax),
            email: firstItem(obj.adminemail)
        },
        tech: {
            name: firstItem(obj.techname),
            organization: firstItem(obj.techorganization),
            street: firstItem(obj.techstreet),
            city: firstItem(obj.techcity),
            state: firstItem(obj.techstateprovince),
            postcode: firstItem(obj.techpostalcode),
            country: firstItem(obj.techcountry),
            phone: firstItem(obj.techphone),
            fax: firstItem(obj.techfax),
            email: firstItem(obj.techemail)
        }
    };

    return {
        rawObj: obj,
        domainObj: domainObj,
        rawData: data
    };
}


module.exports = getDomainObject;