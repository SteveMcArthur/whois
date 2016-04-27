/*global module*/

//very lazy object copier
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

var contactObj = {
    name: '',
    organization: '',
    street: '',
    city: '',
    state: '',
    phone: '',
    fax: '',
    email: ''
};

var domainObj = {
    domainName: '',
    id: '',
    creationDate: '',
    updateDate: '',
    expireDate: '',
    nameservers: [],
    registrar: copy(contactObj),
    registrant: copy(contactObj),
    admin: copy(contactObj),
    tech: copy(contactObj)
};

module.exports.getContactObj = function(){
    return copy(contactObj);
};



module.exports.get = function (obj) {
    var temp = copy(domainObj);
    for (var prop in temp) {
        temp[prop] = obj[prop] || null;
    }

    return temp;
};