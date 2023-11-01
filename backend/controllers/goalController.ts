import express from 'express';
import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModal';

export const getGoals = asyncHandler(async (req: express.Request, res: express.Response) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

export const setGoal = asyncHandler(async (req: express.Request, res: express.Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

export const updateGoal = asyncHandler(async (req: express.Request, res: express.Response) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedGoal);
});

export const deleteGoal = asyncHandler(async (req: express.Request, res: express.Response) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});
