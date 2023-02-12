const { MarkovMachine } = require('./markov');

describe('MarkovMachine', function () {
    test('makeChains should return an object', function () {
        const text = new MarkovMachine('the cat in the hat');
        const chains = text.makeChains();
        expect(chains).toEqual(expect.any(Object));
    });

    test('makeText should return a string', function () {
        const text = new MarkovMachine('the cat in the hat');
        const chains = text.makeText(10);
        expect(chains).toEqual(expect.any(String));
    });
});
