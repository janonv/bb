
const dummy = require('../utils/list_helper').dummy

describe('dummy',() => {
    test('dummy returns one',() => {
        const blogs = []

        expect(dummy(blogs)).toBe(1)
    })
})