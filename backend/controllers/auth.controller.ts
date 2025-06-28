import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errorHandler(400, 'All fields are required'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, 'User already exists'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return next(errorHandler(500, 'Registration failed'));
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, 'Email and Password are required'));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(400, 'User does not exists'));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(errorHandler(400, 'Invalid credentials'));
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!
    );

    const { password: _, ...userInfo } = user.toObject();

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userInfo,
    });
  } catch (err) {
    return next(errorHandler(500, 'Login failed'));
  }
};