import { Request, Response, NextFunction } from 'express';
import Transaction from '../models/transaction.model';

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};