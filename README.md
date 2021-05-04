# GENERAL SEARCH ENGINE
This module will allow you to search for modules in npm, images in google, repos in github... without any API KEY
# Installation
To do the installation correctly you need to have [node](https://nodejs.org/en/) installed
```
npm:

npm i general-search-engine
```
## Usage
```js
const gse = require("general-search-engine")

async  function  main(){
	let petition = await new gse.search()
		.setType("image")
	  .setQuery("pink elephant").run()

console.log(petition)
}

main()

/*
This will return an array like this:
[{
    image: <IMAGE URL>,
    title: 'Pink Elephant | pint...',
    from: 'pinterest.com'
  },
  {
    image: <IMAGE URL>,
    title: 'Buy Pink Elephant...',
    from: 'amazon.com'
}...]
*/
```
## Reference
Functions references, for examples [Here](https://github.com/pipebits/general-search-engine/tree/main/tests-examples)
#### 1. General
|Function|Result|Comments| 
|--|--|--|
|gse.version|:String|Package version|
|gse.homepage|:String|Package homepage|
|gse.bugReport|:String|Package bugReport page|
|gse.contact|{...}|Contact information|
||Email|Contact email
||Discord|Discord tag
||Github|Github profile
#### 2. Search
|Function|Result|Comments| 
|--|--|--|
|new gse.search() |{...}|Contact information|
||.setType(type)|Set the search type|
||.setQuery(query)|Set the query to search|
||.setOptions({options})|Set search options|
||.run()|Make the search with the actual parameters (This funcion is asynchronous)|
### Types and Return arrays:
#### Npm:
Find and get npm packages preview.
|Return|Object params|Return| 
|--|--|--|
|[{...} ...]|title|:String|
||description|:String|
||author|:String|
||version|:String|
||maintenance|:String|
||quality|:String|
||popularity|:String|
#### Image:
Find and get image from Google Images.
|Return|Object params|Return| 
|--|--|--|
|[{...} ...]|image|:String|
||title|:String|
||from|:String|
#### Github:
Find and get github repositories preview.
|Return|Object params|Return| 
|--|--|--|
|[{...} ...]|title|:String|
||description|:String|
||topics|[:String ...]|
||stars|:String|
#### Wikipedia:
Find and get wikipedia articles preview.
|Return|Object params|Return| 
|--|--|--|
|[{...} ...]|title|:String|
||description|:String|
||link|[:String ...]|
#### Search:
Find and get pages preview from Google Search.
|Return|Object params|Return| 
|--|--|--|
|[{...} ...]|title|:String|
||description|:String|
||link|[:String ...]|