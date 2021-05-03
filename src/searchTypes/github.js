const functions = require("../functions.js")

const DomParser= require('dom-parser');
var parser = new DomParser();

let url = "https://github.com/search?q={QUERY}"

module.exports = {
    type: "github",
    execute: async (query, options) => {
        //Request code and format it to obtain a different code per image
        var repos_code = functions.parseHtml(await functions.requestCode(url.replace(/{QUERY}/g, query)), "mt-n1").map(item => item = item.innerHTML)

        var repo_array = repos_code.map(item =>{
            var dom = parser.parseFromString(item)
            console.log(dom.getElementsByClassName("mb-1")[0])
            return {
                title: dom.getElementsByClassName("v-align-middle")[0].innerHTML.replace(/<[^>]*>/g, ""),
                description: dom.getElementsByClassName("mb-1")[0]?.innerHTML.replace(/<[^>]*>/g, "", /[\n]/g, "", ).replace(/[\n]/g, "").replace(/  +/g, ' ') || null,
                topics: dom.getElementsByClassName("topic-tag").map(item => item = item.innerHTML.replace(/[ \n]/g, "")),
                stars: dom.getElementsByClassName("Link--muted")[0].innerHTML.replace(/<[^>]*>/g, "").replace(/[ \n]/g, "")
            }
        })

        return repo_array
    }
}