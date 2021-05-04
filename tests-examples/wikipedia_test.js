const gse = require("../src/index")

async function main(){
	try{
		/*let petition = new gse.search()
			.setType("twitch")
			.setQuery("express").run()
		
		console.log(await petition)*/
		
		petition = new gse.search()
			.setType("wikipedia")
			.setQuery("radiometer").setOptions({language: "es"}).run()
		
		console.log(await petition)
	} catch(err){
		console.log(err)
	}
	
}

main()