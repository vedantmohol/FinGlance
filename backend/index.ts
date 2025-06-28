import express from 'express';
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/auth', authRoutes);