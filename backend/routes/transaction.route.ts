import express from 'express';
import { getTransactions, getTransactionSummary } from '../controllers/transaction.controller.js';

const router = express.Router();

router.get('/getTransactions',(req,res,next)=>{getTransactions(req,res,next)});
router.get('/getSummary',(req,res,next)=>{getTransactionSummary(req,res,next)});

export default router;