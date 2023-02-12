/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require('./markov');
const fs = require('fs');
const axios = require('axios');

const args = process.argv.slice(2);

function textFromFile(args) {
    fs.readFile(args[1], 'utf-8', (error, data) => {
        if (error) {
            console.log('Error reading file: ', error);
        }
        const text = new MarkovMachine(data);
        console.log(text.makeText(20));
    });
}

async function textFromUrl(args) {
    try {
        promise = await axios.get(args[1]);
        const text = new MarkovMachine(promise.data);
        console.log(text.makeText(20));
    } catch (e) {
        console.log('Invalid URL');
    }
}

function fileOrUrl() {
    if (args[0] === 'file') {
        textFromFile(args);
    } else if (args[0] === 'url') {
        textFromUrl(args);
    } else {
        console.log('error');
    }
}

fileOrUrl();

module.exports = {
    textFromFile: textFromFile,
    textFromUrl: textFromUrl,
    fileOrUrl: fileOrUrl,
};
