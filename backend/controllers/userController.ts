import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModal';

export const registerUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPasswoard = await bcrypt.hash(password, salt);

  const createdUser = await User.create({
    name,
    email,
    password: hashPasswoard,
  });

  if (createdUser) {
    res.status(201).json({
      _id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser._id),

    });
  } else {
    res.status(400);
    throw new Error('User not created');
  }
});

export const loginUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  if (findUser && (await bcrypt.compare(password, findUser.password))) {
    res.status(201).json({
      _id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      token: generateToken(findUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});

export const getUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.status(200).json(req.user);
});

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
