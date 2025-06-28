import express,{ Request, Response, NextFunction }  from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL!).then(() =>{
    console.log("Connected to database");
}).catch((error)=>{
    console.log(error);
});

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/auth', authRoutes);

export const errorMiddleware = ( err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

app.use(errorMiddleware);