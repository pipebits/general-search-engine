const fs = require('fs');
const path = require('path')

const searchTypesFile = fs.readdirSync(path.join(__dirname, './searchTypes'));
var searchTypes = {}

for (const file of searchTypesFile) {
    const searchType = require(path.join(__dirname, `./searchTypes/${file}`));
    searchTypes[searchType.type] = searchType;
}

/**
 * Represents a search, implementing options, types and queries
 */
class search {
    /**
     * Set the search type
     * @param {String} type The type of search
     * @returns {search}
     */
    setType(type){
        if(searchTypes[type] != undefined){
            this.type = type.toLowerCase();
            return this;
        } else {
            let error = new Error("Type not allowed")
            console.error(error)
            return this;
        }
    }
    /**
     * Set the query to search
     * @param {String} query The query to search
     * @returns {search}
     */
    setQuery(query){
        this.query = query.toLowerCase();
        return this;
    }

    /**
     * Set search options
     * @param {object} options The search options
     * @returns {search}
     */
    setOptions(options){
        this.options = options;
        return this;
    }

    /**
     * Make the search
     * @returns {object}
     */
     async run(){
        if(this.type === undefined){
            let error = new Error("Search type not established")
            console.error(error)
            return;
        }
        if(this.query === undefined){
            let error = new Error("Search query not established")
            console.error(error)
            return;
        }
        return searchTypes[this.type].execute(this.query, this.options);
    }
}

module.exports = search