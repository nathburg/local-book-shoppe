const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('route tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books at the /books route', async () => {
    const res = await request(app).get('/books');
    expect (res.body.length).toEqual(4);
    const seinLanguage = res.body.find((book) => book.id === '1');
    expect(seinLanguage).toHaveProperty('title', 'SeinLanguage');
    expect(seinLanguage).toHaveProperty('released', 1993);
  });

  it('should return a list of authors at /authors route', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(4);
    const seinfeld = res.body.find(author => author.id === '1');
    expect(seinfeld).toHaveProperty('name', 'Jerry Seinfeld');
  });

  it('returns proper book info at /books/:id', async () => {
    const res = await request(app).get('/books/4');
    expect(res.body).toHaveProperty('released', 1814);
    expect(res.body.authors.length).toEqual(2);
  });

  afterAll(() => {
    pool.end();
  });
});
