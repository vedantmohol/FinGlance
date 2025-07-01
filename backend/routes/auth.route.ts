import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', (req, res, next) => {registerUser(req, res, next)});
router.post('/login', (req, res, next) => {loginUser(req, res, next)});
router.post('/logout', (req, res, next) => {logoutUser(req,res, next)});

export default router;
