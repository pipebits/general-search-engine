const functions = require("../functions.js")

const DomParser= require('dom-parser');
var parser = new DomParser();

let url = "https://www.google.com/search?q={QUERY}&ie=UTF-8&oe=UTF-8"

module.exports = {
    type: "search",
    execute: async (query, options) => {
        //Request code and format it to obtain a different code per package
        var search_code = functions.parseHtml(await functions.requestCode(url.replace(/{QUERY}/g, query)), "ZINbbc").filter(item => {if(item.attributes[0].value == "ZINbbc xpd O9g5cc uUPGi" && /^<div class="kCrYT"><a/.test(item.innerHTML)){return true} else {return false}}).map(item => item = item.innerHTML)

        if(search_code.length == 0){
            throw(`[PAGE NOT FOUND]`)
        }

        var search_array = search_code.map(item =>{
            var dom = parser.parseFromString(item)
            return {
                title: dom.getElementsByClassName("BNeawe")[0].innerHTML,
                link: dom.getElementsByTagName("a")[0].attributes[0].value.replace(/\/url\?q=/, ""),
                description: dom.getElementsByClassName("s3v9rd")[0].innerHTML.replace(/<[^>]*>/g, "").replace(/  +/g, ' ')
            }
        })

        return search_array
    }
}