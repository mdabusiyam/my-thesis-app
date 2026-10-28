const request = require('supertest');
const app = require('./index');

describe('GET /', () => {
  it('should return status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
