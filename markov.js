/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chain = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chain = {};
    for (let i=0; i<this.words.length; i++){
      let key = this.words[i]
      let nextWord = this.words[i+1] || null;
      if (chain.hasOwnProperty(key)){
        chain[key].push(nextWord)
      }else{
        chain[key] = [nextWord]
      }
    }
    return chain;
  }


  /** return random word from chains */
  static randomWord(arr){
    let randIdx = Math.floor(Math.random() * arr.length);
    return arr[randIdx];
  }

  makeText(numWords = 100) {
    // return empty string if chain is empty
    if (Object.keys(this.chain).length ===0){
      return "";
    }
    
    const randomFirstWord = MarkovMachine.randomWord(this.words);
    let message = [randomFirstWord]
    
    let i = 0; 
    while (message.length < numWords && !this.chain[message[i]].includes(null)){
      let nextWordsArr = this.chain[message[i]]
      let randomNextWord = MarkovMachine.randomWord(nextWordsArr);
      if (randomNextWord){
        message.push(randomNextWord)
      }
      i++;
    }
    message = message.join(' ')
    return message
  }
}

// let test = new MarkovMachine('the cat in the hat')
// console.log(test.chain)
// console.log(test.makeText(30))

module.exports = {
  MarkovMachine
};