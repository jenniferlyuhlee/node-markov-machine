const { MarkovMachine } = require('./markov')
const { createTextFromFile } = require('./makeText')

let testText = "Congratulations!\nToday is your day.\nYou're off to Great Places! \nYou're off and away!\n\nYou have brains in your head.\nYou have feet in your shoes\nYou can steer yourself\nAny direction you choose.\nYou're on your own. And you know what you know.\nAnd YOU are the guy who'll decide where to go."
let testMM = new MarkovMachine(testText)

let invalidTestText = ""
let invalidTestMM = new MarkovMachine(invalidTestText)

describe('MarkovMachine chain tests', () => {
    test('should return chain dictionary with correct array members', () =>{
        expect(testMM.chain).toBeInstanceOf(Object)
        expect(testMM.chain["You're"]).toContain('off')
        expect(testMM.chain['to']).toContain('Great')
        expect(testMM.makeChains()['Any']).toContain('direction')
        expect(testMM.makeChains()['go.']).toContain(null)

        expect(testMM.chain['feet']).not.toContain('your')
        expect(testMM.makeChains()['have']).not.toContain('is')
        expect(testMM.makeChains()['Today']).not.toContain('day')
    });
    test('should return empty chain', ()=>{
        expect(invalidTestMM.chain).toBeInstanceOf(Object)
        expect(invalidTestMM.chain["You're"]).toBeUndefined()
        expect(invalidTestMM.chain['to']).toBeUndefined()
        expect(invalidTestMM.chain['Any']).toBeUndefined()
        expect(invalidTestMM.chain['go.']).toBeUndefined()
        expect(Object.keys(invalidTestMM.chain).length).toEqual(0)
    })
});

describe('Markov Machine string to array tests', () =>{
    test('should create an array from a string of words', () =>{
        expect(testMM.words).toBeInstanceOf(Array)
        expect(testMM.words).toContain('Today')
        expect(testMM.words).toContain('is')
        expect(testMM.words).toContain('your')
        expect(testMM.words).toContain('day.')
    });
    test('should return empty array', () =>{
        expect(invalidTestMM.words).toBeInstanceOf(Array)
        expect(invalidTestMM.words.length).toEqual(0)
        expect(invalidTestMM.words[0]).toBeUndefined()
        expect(invalidTestMM.words[1]).toBeUndefined()
    })
});

describe('Markov Machine generate text tests', () => {
    test('should return a random word from array of text', () =>{
        expect(testMM.words).toContain(MarkovMachine.randomWord(testMM.words))
        
        let testArr1=['a', 'random', 'word', 'from', 'this', 'test', 'array']
        expect(testArr1).toContain(MarkovMachine.randomWord(testArr1))

        let testArr2=['another', 'array', 'test']
        expect(testArr2).toContain(MarkovMachine.randomWord(testArr2))
    });

    test('should return undefined from empty string', () =>{
        expect(MarkovMachine.randomWord(invalidTestMM.words)).toBeUndefined();
    })

    test('should generate some text from chains', () => {
        expect(testMM.makeText()).not.toBeNull();
        expect(testMM.makeText()).not.toBeFalsy();
        expect(testMM.makeText().length).toBeGreaterThan(0);
    });

    test('should generate empty text from empty chain', () =>{
        expect(invalidTestMM.makeText()).toEqual("")
    });
})