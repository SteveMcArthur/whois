/*global require*/
var whois = require('node-whois');
var fs = require('fs');
var path = require('path');

var dataFormatter = {
    com: require('./parsers/parseCOM'),
    uk: require('./parsers/parseUK'),
    au: require('./parsers/parseAU'),
    cn: require('./parsers/parseCN'),
    ca: require('./parsers/parseCA')
};

function defaultFormatter(data) {
    return data;
}
var tldRegex = new RegExp(/\.([a-zA-Z]{2,})+$/);


var lookup = 'bbc.co.uk';
console.log("lookup: "+lookup);
whois.lookup(lookup, function (err, data) {
    console.log("lookup returned");
    if (err) {
        console.error(err);
    } else {
        var m = tldRegex.exec(lookup);
        var tld = m ? m[1] : "";
        var formatResponse = dataFormatter[tld] || defaultFormatter;
        console.log("write out raw data");
        fs.writeFileSync(path.join('./data',lookup + '-orig.txt'), data, 'utf-8');
        console.log("format results");
        var result = formatResponse(data);
        console.log("write out formatted results");
        fs.writeFileSync(path.join('./data',lookup + '-data.json'), JSON.stringify(result.domainObj,null,4), 'utf-8');
    }
});