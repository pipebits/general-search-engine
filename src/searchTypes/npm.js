const functions = require("../functions.js")

const DomParser= require('dom-parser');
var parser = new DomParser();

let url = "https://www.npmjs.com/search?q={QUERY}"

module.exports = {
    type: "npm",
    execute: async (query, options) => {
        //Request code and format it to obtain a different code per package
        var packages_code = functions.parseHtml(await functions.requestCode(url.replace(/{QUERY}/g, query)), "ef4d7c63").map(item => item = item.innerHTML)

        //Check that we have at least one package
        if(packages_code.length == 0){
            throw(`[NPM NOT FOUND]: Query ${query} not found`)
        }

        //Parse the output
        var packages_array =  packages_code.map(item => {
            var dom = parser.parseFromString(item)
            var stats = dom.getElementsByClassName("_4ed4187c").map(item => item = item.attributes)

            //And make a diferent object to every package
            return {
                title: dom.getElementsByClassName("db7ee1ac")[0].innerHTML,
                description: dom.getElementsByClassName("_8fbbd57d")[0].innerHTML,
                author: dom.getElementsByClassName("e98ba1cc")[0].innerHTML,
                version: dom.getElementsByClassName("_66c2abad")[0].innerHTML.split("<!-- -->")[1],
                maintenance: stats[0][1].value.split(" ")[1],
                quality: stats[1][1].value.split(" ")[1],
                popularity: stats[2][1].value.split(" ")[1]
            }
        })

        return packages_array
    }
}