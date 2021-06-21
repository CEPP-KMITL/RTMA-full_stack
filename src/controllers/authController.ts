import { RequestHandler } from 'express';
import { User } from '../models/userModel';

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: 'Create user successfully.',
      createdUser: newUser,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to create user' + ' : ' + e,
    });
  }
};
