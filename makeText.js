/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');

/* Create new instance of Markov Machine to generate text from it */
function generateMarkovText(text){
    let mm = new markov.MarkovMachine(text)
    console.log (mm.makeText())
}


/* Read file, and if successful generate text */
function createTextFromFile (path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.error(`Error reading ${path}: ${err}`)
            process.exit(1)
        }
        else{
            generateMarkovText(data);
        }
    });
}


/* Read URL, and if successful generate text */
async function createTextFromURL(url){
    try{
        const resp = await axios.get(url);
        generateMarkovText(resp)
    }
    catch(err){
        console.error(`Error fetching ${url}: ${err}`)
        process.exit(1);
    }
}


/* Command-line args */
let method = process.argv[2]
let path = process.argv[3]

if (method === 'file'){
    createTextFromFile(path)
}
else if (method === 'url'){
    createTextFromURL(path)
}
else{
    console.error(`Invalid method: ${method}`)
    process.exit(1)
}


module.exports = {
    createTextFromFile
  };