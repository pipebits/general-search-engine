const gse = require("general-search-engine")

async function main(){
	let petition = new gse.search()
		.setType("npm")
		.setQuery("express").run()
	
	console.log(await petition)
	
	petition = new gse.search()
		.setType("npm")
		.setQuery("react").run()
	
	console.log(await petition)
}

main()