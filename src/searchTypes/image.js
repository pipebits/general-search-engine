const functions = require("../functions.js")

const DomParser= require('dom-parser');
var parser = new DomParser();

let url = "https://www.google.com/search?q={QUERY}&tbm=isch&ie=UTF-8&oe=UTF-8"

module.exports = {
    type: "image",
    execute: async (query, options) => {
        //Request code and format it to obtain a different code per image
        var images_code = functions.parseHtml(await functions.requestCode(url.replace(/{QUERY}/g, query)), "TxbwNb").map(item => item = item.innerHTML)
        
        //Check that we have at least one image
        if(images_code.length == 0){
            throw(`[IMAGE NOT FOUND]`)
        }

        //Parse the output
        var images_array = images_code.map(item => {
            var dom = parser.parseFromString(item)

            //And make a diferent object to every image
            return {
                image: dom.getElementsByClassName("t0fcAb")[0]?.attributes[2].value || null,
                title: dom.getElementsByClassName("fYyStc")[0]?.innerHTML || null,
                from: dom.getElementsByClassName("fYyStc")[1]?.innerHTML || null
            }
        })

        return images_array
    }
}