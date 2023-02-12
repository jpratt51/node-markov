/** Textual markov chain generator */

class MarkovMachine {
    /** build markov machine; read in text.*/

    constructor(text) {
        if (typeof text !== 'string') {
            throw new Error('Input must be a string');
        }
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter((c) => c !== '');
        this.makeChains(this.words);
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        let mChains = {},
            wordsArr = [],
            dups = {};
        const words = this.words;

        for (let word of words) {
            if (wordsArr.includes(word) === false) {
                wordsArr.push(word);
                let nextWordIndex = words.indexOf(word) + 1;
                let nextWord = words[nextWordIndex];
                mChains[word] = [nextWord];
            } else if (wordsArr.includes(word) === true) {
                if (word in dups === false) {
                    dups[word] = words.indexOf(word);
                    let nextWordIndex = words.indexOf(word, dups[word] + 1) + 1;
                    let nextWord = words[nextWordIndex];
                    mChains[word].push(nextWord);
                    dups[word] = nextWordIndex;
                } else if (word in dups === true) {
                    let nextWordIndex = words.indexOf(word, dups[word] + 1) + 1;
                    let nextWord = words[nextWordIndex];
                    mChains[word].push(nextWord);
                    dups[word] = nextWordIndex;
                }
            }
        }
        return mChains;
    }
    /** return random text from chains */

    makeText(numWords) {
        let wordArr = [];
        const mChains = this.makeChains(this.words);
        let i = 0;
        let j = 0;
        while (i < numWords / 2) {
            const keys = Object.keys(mChains);
            let randWord = keys[(keys.length * Math.random()) << 0];
            if (j <= numWords) {
                wordArr.push(randWord);
                j++;
            } else {
                break;
            }

            let followUpWord =
                mChains[randWord][
                    (mChains[randWord].length * Math.random()) << 0
                ];
            if (followUpWord !== undefined) {
                if (j <= numWords) {
                    wordArr.push(followUpWord);
                    i++;
                } else {
                    break;
                }
            }
        }
        const newText = wordArr.join(' ');
        // console.log(newText);
        return newText;
    }
}

module.exports = { MarkovMachine };

// let test = new MarkovMachine('the cat in the hat');
// console.log(test.makeText(10));
