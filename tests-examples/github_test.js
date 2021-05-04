const gse = require("../src/index")

async function main(){
	try{
		let petition = new gse.search()
			.setType("github")
			.setQuery("express").run()
		
		console.log(await petition)
		
		petition = new gse.search()
			.setType("github")
			.setQuery("react").run()
		
		console.log(await petition)
	} catch(err){
		console.log(err)
	}
}

main()