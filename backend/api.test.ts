import { describe } from '@jest/globals';
import supertest from 'supertest';
import app from './server';

describe('GET /api/goals', () => {
  it('should return 401 if not authorized', async () => {
    await supertest(app).get(`/api/goals/`).expect(401);
  });
});
