const functions = require("../functions.js")

const DomParser= require('dom-parser');
var parser = new DomParser();

let url = "https://{LANGUAGE}.wikipedia.org/w/index.php?search={QUERY}&title=Special%3ASearch&fulltext=1&ns0=1"
let shortUrl = "https://{LANGUAGE}.wikipedia.org"
languages = {
    default: "en",
    languageList: [
        "en", "es"
    ]
}

module.exports = {
    type: "wikipedia",
    execute: async (query, options) => {
        //Request code and format it to obtain a different code per image
        if(languages.languageList.includes( options?.language)){
            url = url.replace(/{LANGUAGE}/g, options.language)
            shortUrl = shortUrl.replace(/{LANGUAGE}/g, options.language)
        } else{
            url = url.replace(/{LANGUAGE}/g, languages.default)
            shortUrl = shortUrl.replace(/{LANGUAGE}/g, options.language)
        }

        wikis_code = functions.parseHtml(await functions.requestCode(url.replace(/{QUERY}/g, query)), "mw-search-result").map(item => item = item.innerHTML);
        
        if(wikis_code.length == 0){
            throw(`[WIKI NOT FOUND]`)
        }
        
        var wikis_array = wikis_code.map(item => {
            var dom = parser.parseFromString(item)
            
            return {
                title: dom.getElementsByClassName("mw-search-result-heading")[0]?.innerHTML.replace(/<[^>]*>/g, "").replace(/  +/g, ' ') || null,
                descriptions: dom.getElementsByClassName("searchresult")[0]?.innerHTML.replace(/<[^>]*>/g, "").replace(/  +/g, ' ') || null,
                link: shortUrl + dom.getElementsByTagName("a")[0]?.attributes[0].value || null
            }
        })

        return wikis_array
    }
}