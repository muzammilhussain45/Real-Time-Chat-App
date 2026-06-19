import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);




app.listen(port, () => {
    connectDB();
  console.log(`Server is running on port ${port}`);
});