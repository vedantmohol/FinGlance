import { Request, Response, NextFunction } from 'express';
import Transaction from '../models/transaction.model.js';

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactionSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await Transaction.find();

    let paidRevenue = 0;
    let paidExpense = 0;
    let totalRevenue = 0;
    let totalExpense = 0;

    transactions.forEach((txn) => {
      if (txn.category === 'Revenue') {
        totalRevenue += txn.amount;
        if (txn.status === 'Paid') {
          paidRevenue += txn.amount;
        }
      } else if (txn.category === 'Expense') {
        totalExpense += txn.amount;
        if (txn.status === 'Paid') {
          paidExpense += txn.amount;
        }
      }
    });

    const balance = paidRevenue - paidExpense;
    const savings = totalRevenue - totalExpense;

    res.status(200).json({ balance, revenue: paidRevenue, expenses: paidExpense, savings });
  } catch (error) {
    next(error);
  }
};