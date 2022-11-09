const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('route tests', async () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books at the /books route', async () => {
    const res = await request(app).get('/books');
    expect (res.body.length).toEqual(4);
    const seinLanguage = res.body.find((book) => book.id === '1');
    expect(seinLanguage).toHaveProperty('title', 'SeinLanguage');
    expect(seinLanguage).toHaveProperty('released', '1993');
  })

  afterAll(() => {
    pool.end();
  });
});
