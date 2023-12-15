import { describe } from '@jest/globals';
import supertest from 'supertest';
import app from './server';
import { generateToken, loginUser } from './controllers/userController';
import mongoose from 'mongoose';

const userPayload = {
  body: {
    email: 'aditi@aditi.com',
    password: '1234',
  },
};

describe('GET /api/goals', () => {
  it('should return 401 if not authorized', async () => {
    await supertest(app).get(`/api/goals/`).expect(401);
  });

  it('should get all goals of logged in user', async () => {
    //login user
    const loggedInUser = await loginUser(userPayload);
    console.log(loggedInUser);
    //create goal

    //get goal
    //expect condition
  });
});
