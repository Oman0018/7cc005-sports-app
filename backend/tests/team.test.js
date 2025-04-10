const request = require('supertest');
const app = require('../app');

describe('GET /api/teams/epl', () => {
  it('should return EPL teams data', async () => {
    const res = await request(app).get('/api/teams/epl');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
