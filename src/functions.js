const fetch = require("node-fetch");

const DomParser= require('dom-parser');
var parser = new DomParser();

module.exports = {
    requestCode: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then( res => res.text() )
            .then( res => {
                resolve(res)
            })
            .catch( err => reject(err) )
        })
    },
    parseHtml: (code, classname) => {
        var dom = parser.parseFromString(code);
        return dom.getElementsByClassName(classname)
    }
}


