import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModal';

const protect = asyncHandler(async (req: express.Request, res: express.Response, next: express.Function) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      [token] = req.headers.authorization.split(' ');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized and no token');
  }
});

export default protect;
