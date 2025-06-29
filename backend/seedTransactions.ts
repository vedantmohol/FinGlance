import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Transaction from './models/transaction.model';

dotenv.config();

const __dirname = path.resolve();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log('✅ Connected to MongoDB');

    const filePath = path.join(__dirname, 'backend/data', 'transactions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const transactions = JSON.parse(jsonData);

    await Transaction.deleteMany();
    await Transaction.insertMany(transactions);

    console.log('🌱 Transactions seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();