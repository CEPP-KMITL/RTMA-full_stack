import { RequestHandler } from 'express';
import { User } from '../models/userModel';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
const bcrypt = require('bcryptjs');
const hashStrength = 12;
export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;
    const hashpassword = await bcrypt.hash(password, hashStrength);
    const newUser = await User.create({
      username,
      password: hashpassword,
    });
    req.session.user = newUser;
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

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;
    const existUser = await User.findOne({ username });
    if (!existUser) {
      throw new Error('User not found');
    }
    const isCorrect = await bcrypt.compare(password, existUser.password);
    if (isCorrect) {
      req.session.user = existUser;
      res.status(201).json({
        message: 'Login successfully.',
      });
    } else {
      throw new Error('Wrong password.');
    }
  } catch (e) {
    res.status(400).json({
      message: 'Fail to login with user' + ' : ' + e,
    });
  }
};
