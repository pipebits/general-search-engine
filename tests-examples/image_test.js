const gse = require("../src/index")

async function main(){
	let petition = new gse.search()
		.setType("image")
		.setQuery("Pink elephant").run()
	
	console.log(await petition)
	
	petition = new gse.search()
		.setType("image")
		.setQuery("red sky").run()
	
	console.log(await petition)
}

main()