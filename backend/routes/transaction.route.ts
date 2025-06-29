import express from 'express';
import { getTransactions } from '../controllers/transaction.controller';

const router = express.Router();

router.get('/getTransactions',(req,res,next)=>{getTransactions(req,res,next)});

export default router;