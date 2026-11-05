const request = require('supertest');
const app = require('./app');

describe('MLOps CI/CD Test Suite', () => {
  it('should pass health check endpoint', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('ML Model API Service Running Healthy');
  });

  it('should return 400 bad request if text is missing', async () => {
    const res = await request(app).post('/api/analyze').send({});
    expect(res.statusCode).toEqual(400);
  });
});
